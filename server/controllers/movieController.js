const Movie = require('../models/Movie');

async function createMovie(req, res) {
  const { title, platform, genre, link, posterPath, rating, cast } = req.body;

  try {
    // Create a new movie instance
    const movie = new Movie({
      title,
      platform,
      genre,
      link,
      posterPath,
      rating,
      cast,
    });

    // Save the new movie record to the database
    const newMovie = await movie.save();

    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createMovie,
};
