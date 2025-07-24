const Job = require('../model/Job');
const { parseXML } = require('../utils/xmlParser');


const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ pubDate: -1 }).limit(100);
    res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Job fetched successfully',
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message,
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
};



// const getAllUsers = async (req, res) => {
//   const cachedUsers = await getCache("all-users");

//   if (cachedUsers) {
//     return res.json({ from: "cache", data: cachedUsers });
//   }

//   const users = await UserModel.find();
//   await setCache("all-users", users);
//   res.json({ from: "db", data: users });
// };