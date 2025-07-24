// const mongoose = require("mongoose");
// const jobSchema = new mongoose.Schema({
//   title: String,
//   link: { type: String, unique: true },
//   pubDate: Date,
//   description: String,
//   category: String,
//   source: String,
// });
// module.exports = mongoose.model("Job", jobSchema);

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  link: String,
});

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);