// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  location: String,
  city:String,
  hall: Number,
  bedroom: Number,
  kitchen: Number,
  furnishing: String,
  rent: Number,
  advance: Number,
  ownername:String,
  phone: String,
  imageUrl: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);
