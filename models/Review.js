const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating : Number,
    description : String,
    user : String 
})

module.exports = mongoose.model('Review', reviewSchema);   