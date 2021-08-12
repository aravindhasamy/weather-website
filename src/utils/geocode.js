const axios = require("axios")

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJhdmluZGhhc2FteSIsImEiOiJja3M1b3U1NWUwM29uMm5vYzZxb3VkamowIn0.HdKozPwR2pJY6dlriOwsuA`

    axios.get(geocodeURL)
.then(({data}) => {
    
    if(data.features.length === 0) {
        console.log("unable to find Geo Location. Try another location.")
        callback("Unable to connect to Location service!", undefined)
    }
    else {
        callback(undefined, {
            latitude : data.features[0].center[1],
            longitude : data.features[0].center[0],
            location : data.features[0].place_name
        })
        
    }
   
})
.catch((error) => {

    error && callback("Unable to connect to Location service!", undefined)
})
}

module.exports = geocode