const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Aravind"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Aravind"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This is the help page.",
        name: "Aravind"
        
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log("geocode error", error)
        if (error) {
            return res.status(400).send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404 page",
        message: "Help article not found.",
        
    })
})


app.get("*", (req, res)=>{
    res.render("error", {
        title: "404 page not found",
       
        
    })
})



app.listen(3000, () => {
    console.log("The server is up on 3000")
})