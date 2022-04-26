require('dotenv').config()

const mongoose = require('mongoose');

const mongoConnection = process.env.MONGOURI

mongoose.connect(mongoConnection)

mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected... 🔅 🔅 🔅 🌎  ➡️➡️➡️ 💻  🔅 🔅 🔅`)
})

mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error  🆘 🆘', error)
})

mongoose.connection.on('disconected', () => {
    console.log('MongoDb Disconnected 🔌 🛑')
})