const express = require('express')
const router = express.Router()
const scraper = require('../scraper')

router.get('/', (req, res) => {
    res.json({
        message:"carii api"
    })
})

router.get('/:title', (req, res) => {
    scraper.searchAnime(req.params.title)
    .then(anime => {
        res.json(anime)
    })
})

router.get('/:title/:page', (req, res) => {
    scraper.searchPage(req.params.title, req.params.page)
    .then(anime => {
        res.json(anime)
    })
})

module.exports = router