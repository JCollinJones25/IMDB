const express = require('express')
const router = express.Router()
const db = require('../models')
const mongoose = require('mongoose')

// index route
router.get('/', async (req, res, next) => {
    try {
        const allActors = await db.Actor.find({})
        const context = {allActors}
        return res.render("actors/index.ejs", context);
    } catch (erro) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// new route 
router.get('/new', async (req, res, next) => {
    try {
        const allMovies = await db.Movie.find({})
        const context = { movies: allMovies }
        res.render('actors/new.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// create route
router.post('/', async (req, res, next) => {
    try {
        var newId =  new mongoose.Types.ObjectId()
        const newActorData = {
            name: req.body.name,
            age: req.body.age,
            image: req.body.image,
            hometown: req.body.hometown,
            movies: newId._id,
        }
        const newActor = await db.Actor.create(newActorData)
        console.log(newActor)
        const newIdName = req.body.movies
        const newMovieData = {
        name: req.body.movies,
        year: 'add movie year',
        director: 'add movie director',
        genre: 'add movie genre',
        image: 'add poster image url',
        rating: 'add rating'
       }
       const newMovie = await db.Movie.create(newMovieData)
       const newMovieId = await db.Movie.findByIdAndUpdate(newMovie._id, { _id: newActorData._id})
        res.redirect(`/movies/${newMovieId._id}/edit`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// show route
router.get('/:actorId', async (req, res, next) => {
    try {
        const foundActor = await db.Actor.findById(req.params.actorId).populate('movies')
        res.render('actors/show.ejs', { actor: foundActor })
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// update route
router.put('/:actorId', async (req, res, next) => {
    res.redirect(`/${req.params.id}`)
})

// edit route
router.get('/:actorId/edit', async (req, res, next) => {
    const context = { actor: req.body }
    res.render ('actors/edit.ejs', context)
})

// delete route
router.delete('/actorId', async (req, res, next) => {
    try {
        const deleteActor = await db.Actor.findByIdAndDelete(req.params.actorId)
        console.log(deleteActor.id, "<<< Actor | ", deleteActor.movie, "<<< Movie")
        res.redirect(`/movies/${deleteActor.movie}`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router