// const mongoose = require("mongoose");
// const importLogSchema = new mongoose.Schema({
//   fileName: String,
//   timestamp: Date,
//   totalFetched: Number,
//   totalImported: Number,
//   newJobs: Number,
//   updatedJobs: Number,
//   failedJobs: [{ job: Object, reason: String }],
// });
// module.exports = mongoose.model("ImportLog", importLogSchema);

// model/importLog.model.js
const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  importDateTime: { type: Date, default: Date.now },
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [{
    reason: String,
    rowData: mongoose.Schema.Types.Mixed,
  }]
});

module.exports = mongoose.model('ImportLog', importLogSchema);
