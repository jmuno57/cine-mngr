const mongoose = require('mongoose');

const seatReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  seats: { type: [Number], required: true },  // Array de números que representa los asientos reservados
  movie: { type: String, required: true },  // Nombre de la película
  room: { type: String, required: true },  // Nombre de la sala
  createdAt: { type: Date, default: Date.now }
});

const SeatReservation = mongoose.model('SeatReservation', seatReservationSchema);

module.exports = SeatReservation;
