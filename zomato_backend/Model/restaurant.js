const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: Number,
        required: true
    },
    locality: {
        type: String
    },
    id: String
})

module.exports = mongoose.model('restaurantsample', restaurantSchema, 'restaurant');