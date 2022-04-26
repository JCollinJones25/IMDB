//connects to database
require('./config/db.connections')

const PORT = 4022

//dependecies
const express = require('express')
const methodOverride = require('method-override')
const controllers = require('./controllers')

//express instances 
const app = express()

app.set('view engine', 'ejs')

//middleware -- express.static helps express find where certain files are located
app.use(express.static('public'))

// body-parser middleware -> intercept the data from our post request
// take all of the data in the url-string content and create an object - req.params 
// request body data - parsed by this middleware
app.use(express.urlencoded({ extended: false }))

// convert a get/post request to a delete/put request
app.use(methodOverride('_method'))

//controllers 
app.use('/Actors', controllers.actors)
app.use('/Movie', controllers.movies)

//routes home route to movies route 
app.get('/', (req,res) => {
    res.redirect('/index')
})


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})


