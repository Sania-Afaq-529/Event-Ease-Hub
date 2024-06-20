// models/Deal.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
  budget: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  food_menu: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  event_type: {
    type: String,
    required: false
  },
  theme: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  services: {
    type: String,
    required: false
  },

  dealId:{
    type:String,
    required:false
  },
  sessionId:{
    type:String,
    required:false
  },
  checkoutUrl:{
    type:String,
    required:false
  },
  status:{
    type:String,
    required:false
  }
  
},{
    timestamps: true,
  });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
