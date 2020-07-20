
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// define config
const publicDir = (path.join(__dirname,'../public'))
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name: "New York, United States of America",
        temperature: 22,
        feelslike: 30
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name: "Dean is here",
        temperature: 22,
        feelslike: 30
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help Page',
        name: "No need to do here",
        temperature: 22,
        feelslike: 30
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404 Error',
        error: "No post found!"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode.getGeoCoding(req.query.address, (error, {lat, lon, name}={}) =>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast.getForecast(lat, lon, (error, forecastData) => {
            if(error){
             return res.send({
                    error:error
                })
            }
             res.send(forecastData)
        })
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404 Error',
        error: "Wrong hole nigga!"
    })
})

app.listen(3000, () => {
    console.log('Server is starting on port 3000')
})