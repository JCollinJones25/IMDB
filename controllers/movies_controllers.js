const express = require('express')
const router = express.Router()
const db = require('../models')

// index route
router.get('/', async (req, res, next) => {
    try {
        const movies = await db.Movie.find({})
        const context = {movies}
        return res.render('index.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// new route
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// show route
router.get('/:id/', async (req, res, next) => {
    try {
        const foundMovie = await db.Movie.findById(req.params.id)
        const allActors = await db.Actor.find({movie: req.params.id})
        const context = {
            oneMovie: foundMovie,
            actors: allActors
        }
        return res.render('show.ejs', context)
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
        const context = {
            movie: updatedMovie
        }
        return res.render('edit.ejs', context)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})