require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const movieRoutes = require('./routes/movieRoutes');
const roomRoutes = require('./routes/roomRoutes');
const sheduleRoutes = require('./routes/sheduleRoutes');
const billboardRoutes = require('./routes/billboardRoutes');
const reservationsRoutes= require('./routes/reservationsRoutes');

const app = express();
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB', err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/movies', movieRoutes);
app.use('/rooms', roomRoutes);
app.use('/shedule', sheduleRoutes);
app.use('/reserve', reservationsRoutes);
app.use('/billboard', billboardRoutes);



app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
