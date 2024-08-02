const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  getMovies,
  addMovies,
  editMovies,
  deleteMovies,
  keepDBActive,
} = require("./controllers/movieController");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ path: "./config.env" });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const uri = process.env.DATABASE_CONN;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB Connection successful"));

app.get("/movies/v1/get-movies", getMovies);
app.post("/movies/v1/add-movie", addMovies);
app.patch("/movies/v1/edit-movie/:movieId", editMovies);
app.delete("/movies/v1/delete-movie/:movieId", deleteMovies);
app.get("/movies/v1/keepDBActive", keepDBActive);

const port = 9000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
