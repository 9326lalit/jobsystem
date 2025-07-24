// const express = require("express");
// const router = express.Router();
// const { getImportHistory } = require("../controllers/importController");

// router.get("/history", getImportHistory);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {  importFromXml } = require('../controllers/importController');

router.get('/import', importFromXml);

module.exports = router;
