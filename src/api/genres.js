const express = require('express')
const router = express.Router()
const scraper = require('../scraper')

router.get('/', (req, res) => {
    scraper.getGenres()
    .then(response => {
        res.json(response)
    })
})

router.get('/:type', (req, res) => {
    scraper.getGenres(req.params.type)
    .then(anime => {
        res.json(anime)
    })
})

module.exports = router