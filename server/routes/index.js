var express = require('express');
var router = express.Router();

/* GET Home page - Splash page or landing page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Crypto Portfolio Tracker' });
});

/* GET Portfolio Tracker page - Where users can view their portfolio */
router.get('/portfolio', function(req, res, next) {
  res.render('Crypto/list', { title: 'Your Crypto Portfolio' });
});

/* GET About Us page - Information about the app */
router.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'About Us' });
});

module.exports = router;
