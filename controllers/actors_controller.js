const express = require('express')
const router = express.Router()
const db = require('../models')

// index route
router.get('/', async (req, res, next) => {
    try {
        const allActors = await db.Actor.find({})
        res.send(allActors)
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
        const newActorData = req.body
        const newActor = await db.Actor.create(newActorData)
        console.log(newActor)
        res.redirect(`/movies/${newActor.movie}`)
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// show route
router.get('/:actorId', async (req, res, next) => {
    try {
        const foundActor = await db.Actor.findById(req.params.actorId).populate('movie')
        res.render('actors/show.ejs', { actor: foundActor })
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

// update route
router.put('/:actorId', async (req, res, next) => {
    res.send('Hitting Actor Update: ' + req.params.actorId)
})

// edit route
router.get('/:actorId/edit', async (req, res, next) => {
    res.send ("Hitting Actor Edit: " + req.params.actorId)
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