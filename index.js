'use strict'
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const rp = require('request-promise');
const Report = require('./models/report');
const addressLocation = require('./addressStrings/IndeedLocations');
const addressJob = require('./addressStrings/jobTitles');
const glassdoorJobs = require('./addressStrings/glassdoorJobs')
const glassdoorSalaries = require('./addressStrings/glassdoorSalaries');

mongoose.connect("", { useNewUrlParser: true })
  .then(() => { 
    console.log('Connected to MongoDB')
    return 'Ready'
  }).catch((err) => { console.log('connection failed')  })
.then((result) => { 
  let timeout = 50
  for (let job in addressJob.titles) {
    for (let location in addressLocation.locations) {
      timeout += 400;
      setTimeout(() => {
        scrapeData(job, location).then((m) => {
          console.log(m)
        })
      }, timeout)
    }
  }
}).then(function(result) {
  setTimeout(function() {
    console.log('Mongo Connection Closed');
    mongoose.connection.close()
  }, 30000)
})

async function scrapeData(job, location) {
  const key = 'http://api.scraperapi.com/?key=&url='

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

  const getIndeedJobData = new Promise((resolve, reject) => {
    let jobsIndeed
    if (location !== '_Average'){
      jobsIndeed = {
        uri: `https://www.indeed.com/jobs?q=${job}&l=${location}&jt=fulltime`,
        transform: function (body) {
          return cheerio.load(body);
        }
      }
    } else if (location === '_Average') {
      jobsIndeed = {
        uri: `https://www.indeed.com/jobs?q=${job}&jt=fulltime`,
        transform: function (body) {
          return cheerio.load(body);
        }
      }
    }
    
    rp(jobsIndeed).then(($) => {
      let totalJobs = $('#searchCount')
        .text()
        .slice(19, 30)
        .split('')
        .filter(character => character !== ',' && character < 10)
        .join('')
      resolve(totalJobs)
    }).catch((err) => { console.log('Jobs not working for', job, location)})
  })

  const getIndeedSalaryData = new Promise((resolve, reject) => {
    let indeedSalaries = addressLocation.locations[location].indeedSalariesString
    const salaries = {
      uri: `https://www.indeed.com/salaries/${addressJob.titles[job]}-Salaries${indeedSalaries}`,
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
        console.log($.text())
      } else if (salary < 1000) {
        salary = salary * 2087
      }
      let samples = $('.cmp-salary-header-content')
        .text().split('')
        .slice(0, 30)
        .filter(character => character < 10 && character !== ' ' )
        .join('')
      
      resolve({
        salary: salary,
        samples: samples
      })
    }).catch((err) => { console.log('Indeed Salaries not working for ', job, location)})
  })

  let glassdoorSalaryData = await getGlassdoorSalaryData;
  let indeedSalaryData = await getIndeedSalaryData;
  let indeedJobData = await getIndeedJobData;
  let glassdoorJobsData = await getGlassdoorJobsData;

  let now = new Date();
  let day = now.getUTCDate()
  let month = now.getMonth()
  let year = now.getFullYear()
 
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
