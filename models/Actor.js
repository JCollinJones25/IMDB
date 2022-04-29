const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty'],
        // unique: [true, 'that is already a movie']
    },
    image: {
        type: String,
        default: 'data:image/jpeg;base64,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',
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