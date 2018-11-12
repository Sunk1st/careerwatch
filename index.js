'use strict'
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const rp = require('request-promise');
const Report = require('./models/report');
const addressLocation = require('./addressStrings/IndeedLocations');
const addressJob = require('./addressStrings/jobTitles');
const glassdoorJobs = require('./addressStrings/glassdoorJobs')
const glassdoorSalaries = require('./addressStrings/glassdoorSalaries');
const indeedJobs = require('./addressStrings/indeedJobs');
const indeedSalaries = require('./addressStrings/indeedSalaries');

mongoose.connect("mongodb+srv://Stephen:@cluster0-uohh3.mongodb.net/careerwatch?retryWrites=true", { useNewUrlParser: true })
  .then(() => { 
    console.log('Connected to MongoDB')
    return 'Ready'
  }).catch((err) => { console.log('connection failed')  })
.then((result) => { 
  let timeout = 50
  for (let job in addressJob.titles) {
    for (let location in addressLocation.locations) {
      timeout += 550;
      setTimeout(() => {
        scrapeData(job, location).then((data) => {
          let report = new Report ({
            day: data.day,
            glassdoorJobs: data.glassdoorJobs,
            glassdoorSalary: data.glassdoorSalary,
            glassdoorSalarySamples: data.glassdoorSalarySamples,
            indeedJobs: data.indeedJobs,
            indeedSalary: data.indeedSalary,
            indeedSampleSet: data.indeedSalarySamples,
            title: data.job,
            metro: data.location,
            month: data.month,
            year: data.year
          })

          console.log(report)

          // try {
          //   report.save()
          // } catch (err) {
          //   console.log(err)
          // }
          
        })
      }, timeout)
    }
  }
}).then(function(result) {
  setTimeout(function() {
    console.log('Mongo Connection Closed');
    // mongoose.connection.close()
  }, 80000)
})

async function scrapeData(job, location) {
  const key = ''

  const getGlassdoorJobsData = new Promise((resolve, reject) => {
    const glassdoorUrl = key + glassdoorJobs.strings[job][location];
    const glassdoorJob = {
      uri: glassdoorUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    }

    rp(glassdoorJob).then(($) => {
      let jobs = Number($('.jobsCount').text()
        .replace(',', '')
        .replace('Jobs', ''))
      resolve(jobs)
    }).catch((err) => { console.log('Glassdoor Jobs Not working for ', job, location)})
  })

  const getGlassdoorSalaryData = new Promise((resolve, reject) => {
    const glassdoorUrl = key  + glassdoorSalaries.strings[job][location];
    const glassdoorSalary = {
      uri: glassdoorUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    }

    rp(glassdoorSalary).then(($) => {
      let salary = Number($('.OccMedianBasePayStyle__payNumber').text()
        .replace('$', '')
        .replace(',', ''))
      
      let samples = Number($('.spacingHelpers__margRt').text()
        .replace('SalariesEmployer nameAverage Base Salaries in (USD)', '')
        .replace(',', ''))

      resolve({
        salary: salary,
        samples: samples
      })
    }).catch((err) => { console.log('Glassdoor Salary Not working for ', job, location)})
  })

  const getIndeedJobsData = new Promise((resolve, reject) => {
    const indeedJobsUrl = indeedJobs.strings[job][location];
    
    const jobsIndeed = {
      uri: indeedJobsUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    }
    
    rp(jobsIndeed).then(($) => {
      let totalJobs = Number($('#searchCount').text()
        .replace('Page 1 of ', '')
        .replace('jobs', '')
        .replace (',', '')
        .replace(' ', ''))
      
      if (totalJobs === 0) {
        let filteredJobs = Number($('#SALARY_rbo .rbList li')
          .first()
          .text()
          .split('')
          .slice(12, 20)
          .join('')
          .replace('(', '')
          .replace(')', ''))

        resolve(filteredJobs)
      } else {
        resolve(totalJobs)
      }
    }).catch((err) => { console.log('Jobs not working for', job, location)})
  })

  const getIndeedSalaryData = new Promise((resolve, reject) => {
    const indeedSalaryUrl = indeedSalaries.strings[job][location];

    const salaries = {
      uri: indeedSalaryUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    }
    rp(salaries).then(function ($) {
      let salary = Number($('.cmp-sal-salary .cmp-salary-amount')
        .text()
        .split('').filter(character => character !== '$' && character !== ',')
        .join(''))
      if (salary === 0) {
        console.log($('.cmp-sal-salary .cmp-salary-amount').text(), job, location)
      } else if (salary < 1000) {
        salary = salary * 2087
      }
      let samples = Number($('.cmp-salary-header-content')
        .text().split('')
        .slice(0, 30)
        .filter(character => character < 10 && character !== ' ' )
        .join(''))
      
      resolve({
        salary: salary,
        samples: samples
      })
    }).catch((err) => { console.log('Indeed Salaries not working for ', job, location)})
  })

  let glassdoorSalaryData, indeedSalaryData, indeedJobData, glassdoorJobsData
  try {
    glassdoorSalaryData = await getGlassdoorSalaryData;
  } catch (e) {
    glassdoorSalaryData = 0;
    console.log('glassdoorSalary error', e, job, location)
  }

  try {
    indeedSalaryData = await getIndeedSalaryData;
  } catch (e) {
    indeedSalaryData = 0
    console.log('indeedSalary error', e, job, location)
  }
  
  try {
    indeedJobData = await getIndeedJobsData;
  } catch (e) {
    indeedJobData = 0;
    console.log('indeedJob error', e, job, location)
  }

  try {
    glassdoorJobsData = await getGlassdoorJobsData;
  } catch (e) {
    glassdoorJobsData = 0;
    console.log('Glassdoor Jobs Error', e, job, location)
  }
  
  let date = new Date();
  let day = date.getUTCDate()
  let month = date.getMonth()
  let year = date.getFullYear()
 
  return {
    day: day,
    glassdoorJobs: glassdoorJobsData,
    glassdoorSalary: glassdoorSalaryData.salary,
    glassdoorSalarySamples: glassdoorSalaryData.samples,
    indeedJobs: indeedJobData,
    indeedSalary: indeedSalaryData.salary,
    indeedSalarySamples: indeedSalaryData.samples,
    job: job,
    location: location,
    month: month,
    year: year
  }
}
