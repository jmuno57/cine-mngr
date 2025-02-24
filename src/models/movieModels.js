const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  clasification: { type: String, required: true },
  duration: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
