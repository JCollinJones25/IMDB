require('dotenv').config()

const express = require('express')

require('./config/db.connections')

const methodOverride = require('method-override')

const controllers = require('./controllers')

const app = express()

const PORT = process.env.PORT

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use('/actors', controllers.actors)

app.use('/movies', controllers.movies)

app.get('/', (req,res) => {
    res.redirect('/movies')
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})


