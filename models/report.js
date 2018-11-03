const mongoose = require('mongoose');

const report = mongoose.Schema({
  title: { type: String, required: true },
  metro: {type: String, required: true },
  glassdoorSalary: {type: Number },
  indeedSalary: {type: Number },
  indeedSampleSet: {type: Number },
  indeedJobs: {type: Number},
  created: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', report);