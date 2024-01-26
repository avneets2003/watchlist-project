const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  genre: { type: String, required: true },
  link: { type: String, required: true },
  posterPath: { type: String },
  rating: { type: Number },
  cast: { type: [String] }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;