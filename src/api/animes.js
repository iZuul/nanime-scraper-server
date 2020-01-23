const express = require('express')
const router = express.Router()
const scraper = require('../scraper')

router.get('/', (req, res) => {
    res.json({
        message:"anime"
    })
})

router.get('/:type', (req, res) => {
    scraper.getAnime(req.params.type)
    .then(anime => {
        res.json(anime)
    })
})

router.get('/:type/:name', (req, res) => {
    scraper.getAnime(req.params.type, req.params.name)
    .then(anime => {
        res.json(anime)
    })
})

module.exports = router