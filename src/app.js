const express = require('express')
const cors = require('cors')

const api = require('./api')
const not_found = require('./middlewares')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message: "Hello.... Welcome to Nanime Scraper API",
        how_to_use : {
            search: "/api/search/[anime_name]",
            detail_anime: "/api/animes/[type]/[link_name]",
            watch: "/api/watch/[list]"
        },
        type: [
            "movie", "anime"
        ],
        example: {
            "if_you_want_to_search_anime": {
                example_1: "/api/search/naruto",
                example_2: "/api/search/one-piece",
            },
            "for_anime" : {
                see_detail: "/api/animes/anime/naruto",
                see_video: "/api/watch/one-piece-episode-912",
            },
            for_movie: {
                see_detail_and_video: "/api/animes/movie/one-piece-movie-14-stampede",
            }
        }
    })
})

app.use('/api', api)
app.use(not_found);

module.exports = app