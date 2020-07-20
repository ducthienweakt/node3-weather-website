const request = require('request')

const geoToken = 'pk.eyJ1IjoiZHVjdGhpZW53ZWFrdCIsImEiOiJjaXQ2cXJnOHcwM2ZuMnltd2ljdmw5MmJqIn0.9HHd3CYVHT5LhhtmLT7gRQ'

const getGeoCoding = (searchText, callback) => {
    request({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + searchText + '.json?access_token=' + geoToken + '&limit=1',
        json: true
    }, 
    (error, response, {message,features} = {}) => {
        if (error) {
            callback('Something went wrong!', undefined)
        } else if (message) {
            callback(message, undefined)
        } else if (!features[0]) {
            callback('No matching results!', undefined)
        } else {
            callback(undefined,{
               lat: features[0].center[1],
               lon: features[0].center[0],
               name: features[0].place_name
            })
        }
    })
}

module.exports = {
    getGeoCoding: getGeoCoding
}