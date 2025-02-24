const express = require('express');
const router = express.Router();
const seatReservationContoller = require('../controllers/seatReservationContoller');

router.post('/', seatReservationContoller.reserveSeats);
router.get('/', seatReservationContoller.getReservations);

module.exports = router;
