const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
   
  requestedByUsername: {
    type: String,
    required: true,
  },
  requestedToUsername: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    
  },
  location: {
    type: String,
  },
  requestMessage: {
    type: String,
  },
  offerPrice: {
    type: Number,
  },
  isAccepted:{
    type:Boolean,
    default:false
  }
  
});
module.exports = mongoose.model("requests", requestsSchema);
