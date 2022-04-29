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
    // console.log(updatedMovie);
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
    const newActorData = {
      name: req.body.actors,
      age: 'add actor age',
      image: 'add actor image',
      hometown: 'add actor hometown',
     }
     const newActor = await db.Actor.create(newActorData)

     let array = [];
     let newId = await db.Actor.find({name: req.body.actors})
     
     for(let i=0; i < newId.length; i++) {
       if (newId.length === 0) {
         let createdId = new mongoose.Types.ObjectId();
         array.push(createdId)
        //  res.redirect(`/actors/${newActor._id}/edit`)
      } else {
        array.push(newId[i]._id)
      }
    }
    
    const newMovieData = {
      name: req.body.name,
      year: req.body.age,
      director: req.body.director,
      genre: req.body.genre,
      rating: req.body.rating,
      image: req.body.image,
      actors: array
    }
    const newMovie = await db.Movie.create(newMovieData)

    res.redirect(`/actors/${newActor._id}/edit`)
    // res.redirect(`/`)
    
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
    let array = [];
    let newActorId = await db.Actor.find({ name: req.body.actors });

    for (let i = 0; i < newActorId.length; i++) {
      if (newActorId.length === 0) {
        let createdActorId = new mongoose.Types.ObjectId();
        array.push(createdActorId);
        res.redirect(`actors/${createdActorId}/edit`);
      } else {
        array.push(newActorId[i]._id);
      }
    }

    const movie = await db.Movie.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      year: req.body.age,
      director: req.body.director,
      genre: req.body.genre,
      rating: req.body.rating,
      image: req.body.image
    });
    res.redirect(`/movies`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
