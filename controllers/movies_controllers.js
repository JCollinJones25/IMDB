const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

// index route
router.get("/", async (req, res, next) => {
  try {
    const movies = await db.Movie.find({}).populate("actors");
    const context = { movies };
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

router.get('/search', async (req,res) =>{
  try {
    const movieQuery  = req.query
    console.log(movieQuery)
    const movie = await db.Movie.find({name: movieQuery.search});
    console.log(movie)
    const actor = await db.Actor.find({name: movieQuery.search});
    console.log(actor)
    if (movie.length > 0) {
      res.redirect(`/movies/${movie[0]._id}`)
    }
    else if (actor.length > 0){
      res.redirect(`/actors/${actor[0]._id}`)
    } else {
      console.log('no match')
    }
    

  }catch(error) {
    console.log(error)
    req.error = error
  }
}) 

// show route
router.get("/:id/", async (req, res, next) => {
  try {
    const foundMovie = await db.Movie.findById(req.params.id).populate(
      "actors"
    );
    const context = {
      oneMovie: foundMovie,
    };
    console.log(context.actors)
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
    const context = {
      movie: updatedMovie
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
    let array = [];
    for (let i = 0; i < 10; i++) {
      let existingActorId = await db.Actor.exists({ name: req.body.actors[i] });
      console.log(existingActorId)
      const newActorData = {
        name: req.body.actors[i],
        movies: [req.params.id]
       }
      if (!existingActorId && req.body.actors[i] !== '') {
        let createdActorId = await db.Actor.create(newActorData)
        array.push(createdActorId);
      } else if (req.body.actors[i] === ''){
        console.log('----- Actor is empty -----')
      } else {
        array.push(req.body.actors[i]);
      } 
    }
    console.log(array)

    for (let i = 0; i < array.length; i++) {
      let newId = await db.Actor.find({name: array[i]})
      array[i] = newId[0]._id
    }
    console.log(array)
    const newMovie = {
      name: req.body.name,
      year: req.body.year,
      director: req.body.director,
      genre: req.body.genre,
      rating: req.body.rating,
      image: req.body.image,
      actors: array
    };


    const movie =  await db.Movie.create(newMovie)
    
    
    // const updateActor = await db.Actor.findByIdAndUpdate(array[0]._id, {movies: newMovie._id})

   res.redirect(`/movies/${movie._id}`)
 

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
    for (let i = 0; i < 10; i++) {
      let existingActorId = await db.Actor.exists({ name: req.body.actors[i] });
      console.log(existingActorId)
      const newActorData = {
        name: req.body.actors[i],
        movies: [req.params.id]
       }
      if (!existingActorId && req.body.actors[i] !== '') {
        let createdActorId = await db.Actor.create(newActorData)
        array.push(createdActorId);
      } else if (req.body.actors[i] === ''){
        console.log('----- Actor is empty -----')
      } else {
        array.push(req.body.actors[i]);
      } 
    }
    console.log(array)

    for (let i = 0; i < array.length; i++) {
      let newId = await db.Actor.find({name: array[i]})
      array[i] = newId[0]._id
    }
    console.log(array)
    const movie = await db.Movie.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      year: req.body.year,
      director: req.body.director,
      genre: req.body.genre,
      rating: req.body.rating,
      image: req.body.image,
      actors: array
    });

    res.redirect(`/movies/${movie._id}`)

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
