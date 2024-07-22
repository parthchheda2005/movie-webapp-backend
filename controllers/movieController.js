const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: movies.length,
      data: { movies },
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      error: "Failed to get movies",
      details: e.message,
    });
  }
};

exports.addMovies = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { movie: newMovie },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: "Failed to create movie",
      details: e.message,
    });
  }
};

exports.editMovies = async (req, res) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { movieId: req.params.movieId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({
        status: "fail",
        error: "Movie not found",
      });
    }
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { movie: updatedMovie },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: "Failed to update movie",
      details: e.message,
    });
  }
};

exports.deleteMovies = async (req, res) => {
  try {
    const deletedMovie = await Movie.findOneAndDelete({
      movieId: req.params.movieId,
    });
    if (!deletedMovie) {
      return res.status(404).json({
        status: "fail",
        error: "Movie not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      error: "Failed to delete movie",
      details: e.message,
    });
  }
};
