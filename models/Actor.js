const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty'],
        // unique: [true, 'that is already a movie']
    },
    image: {
        type: String,
        required: true
    },
    age: {
        type: String,
        min: 0
    },
    hometown: {
        type: String
    },
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }]
});


const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;