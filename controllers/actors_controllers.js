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
      actors: [req.params.id]
    };
      
    let array = [];
    let newMovieId = await db.Movie.find({ name: req.body.movies });
    for (let i = 0; i < newMovieId.length; i++) {
      if (newMovieId.length === 0) {
        const newMovie = await db.Movie.create(newMovieData);
        array.push(newMovie);
      } else {
        array.push(newMovieId[i]._id);
      }
    }
    const newActorData = {
      name: req.body.name,
      age: req.body.age,
      image: req.body.image,
      hometown: req.body.hometown,
      movies: array,
    };
   
    const newActor = await db.Actor.create(newActorData);

   
    for(let i=0; i <= newMovieId.length; i++) {
    if (newMovieId.length > 0) {
      res.redirect(`/actors/${newActor._id}`);
      
    } else {
        res.redirect(`/actors/${array[0]._id}/edit`);
    }
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
      actors: [req.params.id]
    };

    let array = [];
    let newMovieId = await db.Movie.find({ name: req.body.movies });
    // console.log(newMovieId)
    // let createdMovieId = await db.Movie.create(newMovieData);
    for (let i = 0; i < newMovieId.length; i++) {
      if (newMovieId.length === 0) {
        let createdMovieId = await db.Movie.create(newMovieData);
        // console.log(createdMovieId)
        array.push(createdMovieId);
    } else {
        array.push(newMovieId[i]._id);
        // console.log("newMovieId[i]._id --->>>>  " + newMovieId[i]._id);
    }
}

const newActor = await db.Actor.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    image: req.body.image,
    hometown: req.body.hometown,
    movies: array
});

// for (let i = 0; i <= createdMovieId.length; i++) {
//     if (createdMovieId.length > 0) {
//       res.redirect(`/actors/${[req.params.id]}`);
//     } else {
//       res.redirect(`/movies/${array[0]._id}/edit`);
//     } 
//   }
for (let i = 0; i <= newMovieId.length; i++) {
    if (newMovieId.length > 0) {
      res.redirect(`/actors/${[req.params.id]}`);
    } else {
      res.redirect(`/movies/${array[0]._id}/edit`);
    } 
  }

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
        deletedActor.id, "<<< Actor | ", 
        deletedActor.movie, "<<< Movie"
        );
    res.redirect(`/actors/`);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
