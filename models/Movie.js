const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty'],
        unique: true
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
        default: 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-800x800.jpg',
        required: true
    },
    rating: {
        type: String,
    },
    actors: [{
        type: mongoose.Types.ObjectId,
        ref: "Actor"
    }]
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;