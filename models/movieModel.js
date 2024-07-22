const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: [true, "Please provide a movieId"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating for the given movie"],
  },
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
