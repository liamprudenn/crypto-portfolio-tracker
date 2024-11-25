var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Importing the model for Crypto
let Crypto = require('../model/crypto');
const crypto = require('../model/crypto');
let cryptoController = require('../controllers/crypto.js');  // Assuming this controller file exists

/* Get route for displaying the crypto list - Read Operation */
/* 
GET: Fetch the list of cryptocurrencies
POST: Add new cryptocurrency
PUT: Edit/Update cryptocurrency
*/
/* Read Operation --> Get route for displaying the list of cryptocurrencies */
router.get('/', async (req, res, next) => {
  try {
    const cryptoList = await Crypto.find();
    res.render('Crypto/list', {
      title: 'Cryptocurrencies',
      cryptoList: cryptoList
    });
  } catch (err) {
    console.error(err);
    res.render('Crypto/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Get route for displaying the Add Crypto Page */
router.get('/add', async (req, res, next) => {
  try {
    res.render('Crypto/add', {
      title: 'Add Cryptocurrency'
    });
  } catch (err) {
    console.error(err);
    res.render('Crypto/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Post route for processing the Add Crypto Page */
router.post('/add', async (req, res, next) => {
  try {
    let newCrypto = Crypto({
      "Name": req.body.Name,
      "PurchasePrice": req.body.PurchasePrice,
      "Quantity": req.body.Quantity,
      "Description": req.body.Description,
      "CurrentPrice": req.body.CurrentPrice
    });
    Crypto.create(newCrypto).then(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    res.render('Crypto/list', {
      error: 'Error on the server'
    });
  }
});

/* Update Operation --> Get route for displaying the Edit Crypto Page */
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const cryptoToEdit = await Crypto.findById(id);
    res.render('Crypto/edit', {
      title: 'Edit Cryptocurrency',
      crypto: cryptoToEdit
    });
  } catch (err) {
    console.error(err);
    next(err); // passing the error
  }
});

/* Update Operation --> Post route for processing the Edit Crypto Page */
router.post('/edit/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedCrypto = Crypto({
      "_id": id,
      "Name": req.body.Name,
      "PurchasePrice": req.body.PurchasePrice,
      "Quantity": req.body.Quantity,
      "Description": req.body.Description,
      "CurrentPrice": req.body.CurrentPrice
    });
    Crypto.findByIdAndUpdate(id, updatedCrypto).then(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    res.render('Crypto/list', {
      error: 'Error on the server'
    });
  }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    Crypto.deleteOne({ _id: id }).then(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    res.render('Crypto/list', {
      error: 'Error on the server'
    });
  }
});

module.exports = router;
