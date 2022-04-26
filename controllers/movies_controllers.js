const express = require('express')
const router = express.Router()
const db = require('../models')

// index route
router.get('/', async (req, res, next) => {
    try {
        const movies = await db.Movie.find({})
        const context = {movies}
        console.log(movies)
        return res.render('movies/index.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// new route
router.get('/new', (req, res) => {
    res.render('movies/new.ejs')
})

// show route
router.get('/:id/', async (req, res, next) => {
    try {
        const foundMovie = await db.Movie.findById(req.params.id)
        const allActors = await db.Actor.find({movie: req.params.id})
        console.log(allActors.length, "Actors Found")
        const context = {
            oneMovie: foundMovie,
            actors: allActors
        }
        return res.render('movies/show.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// edit route
router.get('/:id/edit', async (req, res, next) => {
    try {
        const updatedMovie = await db.Movie.findById(req.params.id)
        console.log(updatedMovie)
        const context = {
            movie: updatedMovie
        }
        return res.render('movies/edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// create route
router.post('/', async (req, res, next) => {
    try {
        const createdMovie = await db.Movie.create(req.body)
        console.log(`Created Movie: ${createdMovie}`)
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// delete route
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedMovie = await db.Movie.findByIdAndDelete(req.params.id)
        const deletedActors = await db.Actor.deleteMany({movie: req.params.id})
        console.log(deletedActors)
        return res.redirect('/movies')
    } catch {
        console.log(error);
        req.error = error;
        return next();
    }
})

// update route 
router.put('/:id', async (req, res, next) => {
    try {
        const updatedMovie = await db.Movie.findByIdAndUpdate(req.params.id, req.body)
        console.log(updatedMovie)
        return res.redirect('/movies')
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router