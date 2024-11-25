const express = require('express');
const router = express.Router();
const Crypto = require('../model/crypto'); 

/* index page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
