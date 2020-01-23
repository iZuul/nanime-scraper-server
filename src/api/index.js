const express = require('express');

const search = require('./search');
const animes = require('./animes');
const watch = require('./watch');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/search', search);
router.use('/animes', animes);
router.use('/watch', watch);

module.exports = router;