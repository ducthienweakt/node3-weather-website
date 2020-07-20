const request = require('request')

const forecastUrl = 'http://api.weatherstack.com/forecast?access_key=3b690af79509c5d94360d788db2e7dd4&query='

const getForecast = (lat, lon, callback) => {
    request({
        url: forecastUrl + lat +',' + lon,
        json: true
    }, (error, response, {current, location, error:dataError}) => {
        if (error) {
            callback('Something went wrong!', undefined)
        } else if (dataError) {
            callback(dataError.info, undefined)
        } else {
            callback(undefined, {
                name: location.name,
                descriptions: current.weather_descriptions[0],
                temperature : current.temperature,
                feelslike : current.feelslike,
                humidity: current.humidity
            })
        }
    })
}

module.exports = {
    getForecast: getForecast
}