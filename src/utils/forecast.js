const axios = require("axios")

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4ff901c6192383c0a6f3ff58d4c37c17&query=${encodeURIComponent(latitude,longitude)}`

    axios.get(url)
        .then(({data}) => {
            
            if(data.error) {
                callback("unable to find location", undefined)
            }
            else {
                callback(undefined, `It is currently ${data.current.temperature} degrees out. There is a ${data.current.precip}% chance of rain.`)
                
            }
        })
        .catch((error) => {
            error && callback("Unable to connect to weather service!", undefined)  
        })

}

module.exports = forecast