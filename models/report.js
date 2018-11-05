const mongoose = require('mongoose');

const report = mongoose.Schema({
  created: {type: Date, default: Date.now },
  day: { type: Number },
  glassdoorSalary: {type: Number },
  indeedJobs: {type: Number},
  indeedSalary: {type: Number },
  indeedSampleSet: {type: Number },
  title: { type: String, required: true },
  metro: { type: String, required: true },
  month: { type: Number },
  year: { type: Number}
});

module.exports = mongoose.model('Report', report);