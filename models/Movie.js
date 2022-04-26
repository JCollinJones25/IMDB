const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    year: {
        type: String
    },
    director: {
        type: String
    },
    genre: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: [0, 'rating cannot be negative'],
        max: 10
    },
    actors: [{
        type: String
    }]
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;