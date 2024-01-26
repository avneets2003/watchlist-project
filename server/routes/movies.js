const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { createMovie } = require('../controllers/movieController');

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new movie
router.post('/', createMovie); // Use the createMovie function as the handler for the POST endpoint

// PUT/update a movie
router.put('/:id', async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Movie updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a movie
router.delete('/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
