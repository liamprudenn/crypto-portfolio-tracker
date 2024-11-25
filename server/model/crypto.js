let mongoose = require('mongoose');

// Define the schema for Crypto
let cryptoSchema = mongoose.Schema({
    Name: String,
    PurchasePrice:Number, 
    Quantity:Number,
    Description: String,
    CurrentPrice: Number, 
}, {
    collection: "crypto_portfolio"
});

// Export the model
module.exports = mongoose.model('Crypto', cryptoSchema);
