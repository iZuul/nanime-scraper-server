const express = require('express')
const scraper = require('./scraper')
const cors = require('cors')


const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message: "Hello.... Welcome to Nanime Scraper",
        help : {
            search: "/search/[anime_name]",
            detail_anime: "/watch/[type]/[anime_name]"
        },
        type: [
            "movie", "anime"
        ]
    })
})

app.get('/search/:title/:page', (req, res) => {
    scraper.searchPage(req.params.title, req.params.page)
    .then(anime => {
        res.json(anime)
    })
})

app.get('/search/:title', (req, res) => {
    scraper.searchAnime(req.params.title)
    .then(anime => {
        res.json(anime)
    })
})

app.get('/anime/:type/:name', (req, res) => {
    scraper.getAnime(req.params.type, req.params.name)
    .then(anime => {
        res.json(anime)
    })
})

app.get('/watch/:list', (req, res) => {
    scraper.getEpisode(req.params.list)
    .then(episode => {
        res.json(episode)
    })
})

// app.get('/page/:number/:title', (req, res) => {
//     scraper.searchPage(req.params.number, req.params.title)
//     .then(anime => {
//         res.json(anime)
//     })
// })


const port = process.env.PORT || 1234
app.listen(port, () => {
    console.log(`Listening on port ${port}....`)
})