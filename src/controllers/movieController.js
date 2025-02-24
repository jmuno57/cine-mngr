const Movie = require('../models/movieModels');
exports.createMovie = async (req, res) => {
  try {
    const { title,clasification , genre, duration } = req.body;

    const newMovie = new Movie({
      title,
      genre,
      clasification,
      duration,
    });

    await newMovie.save();
    res.status(201).json({ message: 'Película creada con éxito', movie: newMovie });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear película', error: err });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener las películas', error: err });
  }
};
