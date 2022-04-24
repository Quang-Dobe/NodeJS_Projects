const mongoose = require('mongoose')

const product = new mongoose.Schema({
    feature: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: [true, "Must provide name of product"]
    },
    price: {
        type: Number,
        required: [true, "Must provide price of product"]
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            // Create a validator for validating VALUE which user provided
            message: '{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model("product", product)