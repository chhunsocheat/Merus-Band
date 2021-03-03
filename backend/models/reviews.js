const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  userImg:{
    type:String
  },
  reviewByUsername: {
    type: String,
    required: true,
  },
  reviewToUsername: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    
  },
  reviewMessage: {
    type: String,
  },
  reviewRating: {
    type: Number,
  },
  
});
module.exports = mongoose.model("reviews", reviewsSchema);
