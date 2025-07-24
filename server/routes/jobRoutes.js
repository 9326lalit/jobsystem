const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById } = require('../controllers/jobController');

router.get('/getalljobs', getAllJobs);
router.get('/:id', getJobById);

module.exports = router;
