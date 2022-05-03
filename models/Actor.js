const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty'],
    },
    image: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg',
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