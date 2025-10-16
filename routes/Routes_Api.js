const express = require('express');
const router = express.Router();


const apiCtrl = require('../controllers/API.js'); 

// // API endpoints
router.get('/user', apiCtrl.getUserByNumber);
router.post('/report', apiCtrl.reportNumber);

module.exports = router;