const express = require('express');
const router = express.Router();
const billboardController = require('../controllers/billboardController');

router.post('/', billboardController.createBillboard);

router.get('/', billboardController.getBillboards);

module.exports = router;
