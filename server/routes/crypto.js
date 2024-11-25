var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Crypto = require('../model/crypto'); 

/* Get route for displaying the cryptocurrencies list (Read Operation) */
router.get('/', async (req, res, next) => {
    try {
        const cryptoList = await Crypto.find(); 
        res.render('portfolio/list', {
            title: 'Crypto Portfolio', 
            cryptoList: cryptoList 
        });
    } catch (err) {
        console.error(err);
        res.render('portfolio/list', {
            title: 'Crypto Portfolio',
            cryptoList: [],
            error: 'Error on the server'
        });
    }
});

/* Get route for displaying the Add Cryptocurrency page */
router.get('/add', async (req, res, next) => {
    try {
        res.render('portfolio/add', {
            title: 'Add Cryptocurrency'
        });
    } catch (err) {
        console.error(err);
        res.render('portfolio/list', {
            title: 'Crypto Portfolio',
            error: 'Error on the server'
        });
    }
});

/* POST route for processing the Add Cryptocurrency form */
router.post('/add', async (req, res) => {
  console.log("Form data received:", req.body); 
  try {
    let newCrypto = new Crypto({
      Name: req.body.Name,
      PurchasePrice: req.body.PurchasePrice,
      Quantity: req.body.Quantity,
      CurrentPrice: req.body.CurrentPrice,
    });

    await newCrypto.save();
    res.redirect('/portfolio');
  } catch (err) {
    console.error(err);
    res.render('portfolio/add', {
      title: 'Add Cryptocurrency',
      error: 'Error saving data',
    });
  }
});


/* Update Operation --> Get route for displaying the Edit Cryptocurrency page */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const cryptoToEdit = await Crypto.findById(id);
        res.render('portfolio/edit', {
            title: 'Edit Cryptocurrency',
            crypto: cryptoToEdit
        });
    } catch (err) {
        console.error(err);
        res.redirect('/portfolio'); 
    }
});

/* Update Operation --> POST route for processing the Edit Cryptocurrency form */
router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let updatedCrypto = {
            Name: req.body.Name,
            PurchasePrice: req.body.PurchasePrice,
            Quantity: req.body.Quantity,
            Description: req.body.Description,
            CurrentPrice: req.body.CurrentPrice
        };

        await Crypto.findByIdAndUpdate(id, updatedCrypto); 
        res.redirect('/portfolio'); 
    } catch (err) {
        console.error(err);
        res.render('portfolio/edit', {
            title: 'Edit Cryptocurrency',
            error: 'Error on the server',
            crypto: await Crypto.findById(req.params.id) 
        });
    }
});

/* Delete Operation --> GET route to perform the Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Crypto.deleteOne({ _id: id }); 
        res.redirect('/portfolio'); 
    } catch (err) {
        console.error(err);
        res.render('portfolio/list', {
            title: 'Crypto Portfolio',
            error: 'Error on the server'
        });
    }
});

module.exports = router;
