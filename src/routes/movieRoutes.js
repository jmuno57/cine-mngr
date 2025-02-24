const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');


router.post('/', movieController.createMovie);

router.get('/', movieController.getMovies);

module.exports = router;
