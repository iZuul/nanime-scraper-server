const express = require('express')
const cors = require('cors')

const api = require('./api')
const not_found = require('./middlewares')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message: "Hello.... Welcome to Nanime Scraper",
        how_to_use : {
            search: "/search/[anime_name]",
            detail_anime: "/animes/[type]/[link_name]",
            watch: "/watch/[list]"
        },
        type: [
            "movie", "anime"
        ]
    })
})

app.use('/api', api)
app.use(not_found);

module.exports = app