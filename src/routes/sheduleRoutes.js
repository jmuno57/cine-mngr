const express = require('express');
const router = express.Router();
const sheduleController = require('../controllers/sheduleController');

router.post('/', sheduleController.createShedule);

router.get('/', sheduleController.getShedules);

module.exports = router;
