require('dotenv').config()
const express = require('express')
const cors = require('cors')
const api = require('./api')
const not_found = require('./middlewares')

const app = express()

const whitelist = [process.env.SERVER_URL, process.env.WEB_URL, process.env.SERVER_DEV, process.env.WEB_DEV, 'https://nanime-scraper.netlify.app/']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      const error = new Error(`Not allowed by CORS`, 'Error')
      callback(error)
    }
  }
}

app.use(cors())

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

app.get('/', (req, res) => {
    res.json({
        message: "Hello.... Welcome to Nanime Scraper API",
        disclaimer_1: "This is just for fun and for my portofolio",
        disclaimer_2: "and I'm not use this to commercial",
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
            "for_movie": {
                see_detail_and_video: "/api/animes/movie/one-piece-movie-14-stampede",
            }
        }
    })
})

app.use('/api', api)
app.use(not_found);

module.exports = app