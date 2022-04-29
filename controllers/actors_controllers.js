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
        const newMovieData = {
            name: req.body.movies,
            year: 'add movie year',
            director: 'add movie director',
            genre: 'add movie genre',
            image: 'add poster image url',
            rating: 'add rating'
           }
           const newMovie = await db.Movie.create(newMovieData)

           let array = [];
           let newId = await db.Movie.find({name: req.body.movies})
           
           for(let i=0; i < newId.length; i++){
               if (newId.length === 0){
                let createdId = new mongoose.Types.ObjectId();
                array.push(createdId)
               }
               else {
                array.push(newId[i]._id)
                
               } 
           }
        const newActorData = {
            name: req.body.name,
            age: req.body.age,
            image: req.body.image,
            hometown: req.body.hometown,
            movies: array
        }
        const newActor = await db.Actor.create(newActorData)
        res.redirect(`/movies/${newMovie._id}/edit`)
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
    try {
        const updatedActor = await db.Actor.findByIdAndUpdate(req.params.id, req.body)
        // console.log(updatedActor)
        res.redirect(`/${req.params.id}`)
    }
    catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
    
})

// edit route
router.get('/:actorId/edit', async (req, res, next) => {
    try {
        const updatedActor = await db.Actor.findById(req.params.id);
        const context = { actor: updatedActor}
        res.render ('actors/edit.ejs', context)
    }
    catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
    
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