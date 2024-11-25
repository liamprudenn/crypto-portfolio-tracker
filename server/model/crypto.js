const mongoose = require("mongoose");

const cryptoModel = mongoose.Schema({
    Name: { type: String, required: true },
    PurchasePrice: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    Description: { type: String, required: false },
    CurrentPrice: { type: Number, required: false },
    DateAdded: { type: Date, default: Date.now }  
}, 
{
    collection: "crypto_portfolio" 
});

module.exports = mongoose.model('Crypto', cryptoModel);
