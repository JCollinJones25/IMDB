const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

// index route
router.get("/", async (req, res, next) => {
  try {
    const allActors = await db.Actor.find({});
    const context = { allActors };
    return res.render("actors/index.ejs", context);
  } catch (erro) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// new route
router.get("/new", async (req, res, next) => {
  try {
    const allMovies = await db.Movie.find({});
    const context = { movies: allMovies };
    res.render("actors/new.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// create route
router.post("/", async (req, res, next) => {
  try {
    const newMovieData = {
      name: req.body.movies,
      year: "add movie year",
      director: "add movie director",
      genre: "add movie genre",
      image: "add poster image url",
      rating: "add rating",
    };
    const newMovie = await db.Movie.create(newMovieData);
    let array = [];
    let newId = await db.Movie.find({ name: req.body.movies });

    for (let i = 0; i < newId.length; i++) {
      if (newId.length === 0) {
        let createdId = new mongoose.Types.ObjectId();
        array.push(createdId);
      } else {
        array.push(newId[i]._id);
      }
    }
    const newActorData = {
      name: req.body.name,
      age: req.body.age,
      image: req.body.image,
      hometown: req.body.hometown,
      movies: array,
    };
    // console.log(newId);
    // console.log(newId.length);
    const newActor = await db.Actor.create(newActorData);
    if (newId.length > 0) {
      res.redirect(`/actors/${newActor._id}`);
    } else {
      res.redirect(`/movies/${newMovie._id}/edit`);
    }
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// show route
router.get("/:actorId", async (req, res, next) => {
  try {
    const foundActor = await db.Actor.findById(req.params.actorId).populate(
      "movies"
    );
    res.render("actors/show.ejs", { actor: foundActor });
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// update route
router.put("/:id", async (req, res, next) => {
  try {
    const newMovieData = {
      name: req.body.movies,
      year: "add movie year",
      director: "add movie director",
      genre: "add movie genre",
      image: "add poster image url",
      rating: "add rating",
    };

    let array = [];
    let newMovieId = await db.Movie.find({ name: req.body.movies });

    for (let i = 0; i < newMovieId.length; i++) {
      if (newMovieId.length === 0) {
        let createdMovieId = new mongoose.Types.ObjectId();
        array.push(createdMovieId);
    } else {
        array.push(newMovieId[i]._id);
    }
}

const newActor = await db.Actor.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    image: req.body.image,
    hometown: req.body.hometown,
    movies: array,
});

const newMovie = await db.Movie.create(newMovieData);

for (let i = 0; i < newMovieId.length; i++) {
    if (newMovieId.length > 0) {
      res.redirect(`/movies/${newMovie[0]._id}/edit`);
    } else {
      res.redirect(`/actors/${newActor._id}`);
    } 
  }

// res.redirect(`/movies/${newMovie._id}/edit`);
// res.redirect(`/actors/${req.params.id}`);

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// edit route
router.get("/:id/edit", async (req, res, next) => {
  try {
    const updatedActor = await db.Actor.findById(req.params.id);
    const context = { actor: updatedActor };
    res.render("actors/edit.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// delete route
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedActor = await db.Actor.findByIdAndDelete(req.params.id);
    // deletedActor.splice(req.params.id, 1)
    console.log(
      deletedActor.id,
      "<<< Actor | ",
      deletedActor.movie,
      "<<< Movie"
    );
    res.redirect(`/actors/`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
