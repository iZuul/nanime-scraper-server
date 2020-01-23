const express = require('express')
const router = express.Router()
const scraper = require('../scraper')

router.get('/', (req, res) => {
    res.json({
        message:"anime"
    })
})

router.get('/:list', (req, res) => {
    scraper.getEpisode(req.params.list)
    .then(episode => {
        res.json(episode)
    })
})

module.exports = router