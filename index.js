'use strict'
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const rp = require('request-promise');
const Report = require('./models/report');
const addressLocation = require('./addressStrings/locations');
const addressJob = require('./addressStrings/jobs');
const glassdoor = require('./addressStrings/glassdoor');

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
        scrapeData(job, location).then((m) => console.log(m))
      }, timeout)

      
      
      // .then(function(result) {
      //   console.log(result)
      //   const jobsIndeed = {
      //     uri: `https://www.indeed.com/jobs?q=${result.title}&l=${result.locationString}&jt=fulltime`,
      //     transform: function (body) {
      //       return cheerio.load(body);
      //     }
      //   }
      //   rp(jobsIndeed).then(($) => {
      //     let totalJobs = $('#searchCount')
      //       .text()
      //       .slice(19, 30)
      //       .split('')
      //       .filter(character => character !== ',' && character < 10)
      //       .join('')
      //     return {
      //       job: result.job,
      //       jobsIndeed: totalJobs,
      //       metroArea: result.metroArea,
      //       salaryIndeed: result.salaryIndeed,
      //       samplesIndeed: result.samplesIndeed
      //     }
      //   }).catch((err) => { console.log('Jobs not working')})
      // })
      // .then(function(result) {
      //   console.log('hello')
      // })
      // .then(function(result) {
      //   setTimeout(function() {
      //     const glassdoorUrl = 'http://api.scraperapi.com/?key=522d8cfbb9b37afb76e391a3d0114b60&url=' + glassdoor.strings[result.job][result.metroArea];

      //     console.log('resultjob', result.job)
      //     console.log('resultMetro', result.metroArea)
      //     console.log('glassdoorUrl', glassdoorUrl)
        
      //     const glassdoorSalary = {
      //       uri: glassdoorUrl,
      //       transform: function (body) {
      //         return cheerio.load(body);
      //       }
      //     }
      
      //     rp(glassdoorSalary).then(($) => {
      //       console.log($('.OccMedianBasePayStyle__payNumber').text())
      //       let salary = Number($('.OccMedianBasePayStyle__payNumber').text()
      //         .replace('$', '')
      //         .replace(',', ''))

      //       console.log(salary)
            
      //       let samples = Number($('.spacingHelpers__margRt').text()
      //         .replace('SalariesEmployer nameAverage Base Salaries in (USD)', '')
      //         .replace(',', ''))

      //       return {
      //         job: result.job,
      //         jobsIndeed: result.jobsIndeed,
      //         metroArea: result.metroArea,
      //         salaryGlassdoor: salary,
      //         salaryIndeed: result.salaryIndeed,
      //         samplesGlassdoor: samples,
      //         samplesIndeed: result.samplesIndeed
      //       }
      
      //     }).catch((err) => { console.log(err, 'Jobs not working')})
      //   }, 500)
      // })
      // .then(function(result) {
      //   let today = new Date();
      //   let day = today.getUTCDate();
      //   let month = today.getMonth();
      //   let year = today.getFullYear();
        
      //   const report = new Report({
      //     created: today,
      //     day: day,
      //     glassdoorSalary: result.salaryGlassdoor,
      //     indeedJobs: result.jobsIndeed,
      //     indeedSalary: result.indeedSalary,
      //     indeedSampleSet: result.samplesIndeed,
      //     title: result.job,
      //     metro: result.metroArea,
      //     month: month,
      //     year: year
      //   })
      //   console.log(report)
      //   report.save(function (err, sucess) {
      //     if (err) console.log(err)
      //   })
      // })
    }
  }
}).then(function(result) {
  setTimeout(function() {
    console.log('Mongo Connection Closed');
    mongoose.connection.close()
  }, 20000)
})

async function scrapeData(job, location) {
  let indeedJobs = addressLocation.locations[location].indeedJobsString
  let indeedSalaries = addressLocation.locations[location].indeedSalariesString
  let jobTitle = addressJob.titles[job]

  const getGlassdoorData = new Promise((resolve, reject) => {
    let key = ''
    const glassdoorUrl = key  + glassdoor.strings[result.job][result.metroArea];
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
    })
  })

  let test = await getGlassdoorData;

  return test;
}

async function getIndeedData(jobTitle, indeedSalaries) {
  const salaries = {
    uri: `https://www.indeed.com/salaries/${jobTitle}-Salaries${indeedSalaries}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  }
  rp(salaries).then(function ($) {
    let salaryIndeed = Number($('.cmp-sal-salary .cmp-salary-amount')
      .text()
      .split('').filter(character => character !== '$' && character !== ',')
      .join(''))
    if (salaryIndeed === 0) {
      console.log($.text())
    } else if (salaryIndeed < 1000) {
      salaryIndeed = salaryIndeed * 2087
    }
    let samplesIndeed = $('.cmp-salary-header-content')
      .text().split('')
      .slice(0, 30)
      .filter(character => character < 10 && character !== ' ' )
      .join('')
    return { 
      job: job,
      metroArea: location,
      locationString: indeedJobs,
      title: jobTitle,
      salaryIndeed: salaryIndeed,
      samplesIndeed: samplesIndeed,
    }
  }).catch(function (err) { console.log("Salaries not working")})
}
   