// models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  budget: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  food_menu: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  event_type: {
    type: String,
    required: true
  },
  services: {
    type: String,
    required: true
  },
  
},{
    timestamps: true,
  });

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
