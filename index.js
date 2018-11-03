'use strict'
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const rp = require('request-promise');
const Report = require('./models/report');
const addressLocation = require('./addressStrings/locations');
const addressJob = require('./addressStrings/jobs');
const glassdoor = require('./addressStrings/glassdoor');

mongoose.connect("mongodb+srv://Stephen:IC2FR9x60QugWZSY@cluster0-uohh3.mongodb.net/careerwatch?retryWrites=true", { useNewUrlParser: true })
  .then(() => { 
    console.log('Connected to MongoDB')
    return 'Ready'
  }).catch((err) => { console.log('connection failed')  })
.then((result) => { 
  for (let job in addressJob.titles) {
    for (let location in addressLocation.locations) {
      let indeedJobs = addressLocation.locations[location].indeedJobsString
      let indeedSalaries = addressLocation.locations[location].indeedSalariesString
      let jobTitle = addressJob.titles[job]
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
        }).catch(function (err) { console.log("Salaries not working")
      }).then(function(result) {
        const jobsIndeed = {
          uri: `https://www.indeed.com/jobs?q=${result.title}&l=${result.locationString}&jt=fulltime`,
          transform: function (body) {
            return cheerio.load(body);
          }
        }
        rp(jobsIndeed).then(($) => {
          let totalJobs = $('#searchCount')
            .text()
            .slice(19, 30)
            .split('')
            .filter(character => character !== ',' && character < 10)
            .join('')
          return {
            job: result.job,
            jobsIndeed: totalJobs,
            metroArea: result.metroArea,
            salaryIndeed: result.salaryIndeed,
            samplesIndeed: result.samplesIndeed
          }
        }).catch((err) => { console.log('Jobs not working')})
        .then(function(result) {
          const glassdoorUrl = 'http://api.scraperapi.com/?key=&url=' + glassdoor.strings[result.job][result.metroArea];
         
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

            return {
              job: result.job,
              jobsIndeed: result.jobsIndeed,
              metroArea: result.metroArea,
              salaryGlassdoor: salary,
              salaryIndeed: result.salaryIndeed,
              samplesGlassdoor: samples,
              samplesIndeed: result.samplesIndeed
            }
      
          }).catch((err) => { console.log('Jobs not working')})
          .then(function(result) {
            let today = new Date();
            console.log(today.getDate())
            console.log(result)
            const report = new Report({
              title: result.job,
              metro: result.metroArea,
              glassdoorSalary: result.salaryGlassdoor,
              indeedSalary: result.indeedSalary,
              indeedSampleSet: result.samplesIndeed,
              indeedJobs: result.jobsIndeed,
              created: today
            })
          })
        })
      })
    }
  }
})
.then(() => {
  
  console.log("Disconnected from MongoDB")
  mongoose.connection.close()
})
   