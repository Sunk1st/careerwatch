'use strict'
const cheerio = require('cheerio')
const fs = require('fs')
const rp = require('request-promise')
const stringify = require('csv-stringify')
const city = require('./../CityPopRank')

exports.getLouisvilleData = function (salaryString, jobString, file) {
  let urlJob = 'https://www.indeed.com/jobs?q=' + jobString + '&l=Louisville,+KY&jt=fulltime'
  let urlSalary = 'https://www.indeed.com/salaries/' + salaryString + '-Salaries,-Louisville-KY'

  const jobs = {
    uri: urlJob,
    transform: function (body) {
      return cheerio.load(body);
    }
  }
  
  const salaries = {
    uri: urlSalary,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(salaries).then(($) => { 
    let salary = Number($('.cmp-sal-average-stats-section #cmp-salary-panel-yearly .cmp-sal-summary .cmp-sal-salary .cmp-salary-amount').text().split('').filter(character => character !== '$' && character !== ',').join(''))
    let samples = $('.cmp-salary-header-content').text().split('').slice(0, 30).filter(character => character < 10 && character !== ' ' ).join('')
 
    let finalResult
    if (salary < 1000) {
      finalResult = 2080 * salary
    } else {
      finalResult = salary
    }
    rp(jobs).then(($) => {
        let totalJobs = $('#searchCount').text().slice(19, 30).split('').filter(character => character !== ',' && character < 10).join('')
        let sendData = 'Louisville, ' + finalResult + ',' + samples + ',' + totalJobs + ',' + city.sizeRank.Louisville + '\n'
        fs.appendFile(file, sendData, function (err) {
          if (err) throw err;
      });
    }).catch((err) => { console.log('Louisville Jobs Not Working')})
  }).catch((err) => { console.log('Louisville Salary not working')});
}