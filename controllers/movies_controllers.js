const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

// index route
router.get("/", async (req, res, next) => {
  try {
    const movies = await db.Movie.find({}).populate("actors");
    const context = { movies };
    console.log(movies);
    return res.render("movies/index.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// new route
router.get("/new", async (req, res, next) => {
  try {
    var newId = new mongoose.Types.ObjectId();
    // const newMovieData = {
    //     name: req.body.name,
    //     year: req.body.age,
    //     director: req.body.director,
    //     genre: req.body.genre,
    //     rating: req.body.rating,
    //     image: req.body.image,
    //     actors: newId._id
    // }
    // const newMovie = await db.Movie.create(newMovieData)
    // console.log(newMovie)
    const movieIdName = req.body.name
    // const newActorData = {
    //     name: req.body.actor,
    //     age: 'add actor age',
    //     image: 'add actor image',
    //     hometown: 'add actor hometown',
    //     movies: 'add actors movies',

    //    }
    //    const newActor = await db.Movie.create(newActorData)
    //    const newActorId = await db.Movie.findByIdAndUpdate(newActor._id, { _id: newMovieData._id})
    // res.redirect(`/actors/${newActorId._id}/edit`)
    res.render("movies/new.ejs");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// show route
router.get("/:id/", async (req, res, next) => {
  try {
    const foundMovie = await db.Movie.findById(req.params.id).populate(
      "actors"
    );
    // const allActors = await db.Actor.find()
    // console.log(allActors.length, "Actors Found")
    console.log(foundMovie);
    const context = {
      oneMovie: foundMovie,
      // actors: allActors
    };
    return res.render("movies/show.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// edit route
router.get("/:id/edit", async (req, res, next) => {
  try {
    const updatedMovie = await db.Movie.findById(req.params.id);
    console.log(updatedMovie);
    const context = {
      movie: updatedMovie,
    };
    return res.render("movies/edit.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// create route
router.post("/", async (req, res, next) => {
  try {
    const createdMovie = await db.Movie.create(req.body);
    console.log(`Created Movie: ${createdMovie}`);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// delete route
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedMovie = await db.Movie.findByIdAndDelete(req.params.id);
    const deletedActors = await db.Actor.deleteMany({ movie: req.params.id });
    console.log(deletedActors);
    return res.redirect("/movies");
  } catch {
    console.log(error);
    req.error = error;
    return next();
  }
});

// update route
router.put("/:id", async (req, res, next) => {
  try {
    const updatedMovie = await db.Movie.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(updatedMovie);
    return res.redirect("/movies");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
