const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    image: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0
    },
    hometown: {
        type: String
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    },
    otherMovies: [{
        type: String
    }]
});


const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;