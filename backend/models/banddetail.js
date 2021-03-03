const mongoose = require("mongoose");

const bandDetailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  members: {
    type: Number,
  },
  isBand: {
    type: Boolean,
  },
  genre: {
    type: Array,
  },
  videos: {
    type: Array,
    default: [],
  },
  allReq: {
    type: Array,
    default: [],
  },
  acceptedReq: {
    type: Array,
    default: [],
  },
  pendingReq: {
    type: Array,
    default: [],
  },
  description:{
    type:Object,
    default:{
      bandTitle:"No title Yet",
      bandDescription:"No Description yet",
      bandPrice:null
    }
  },
  rating:{
    type:Array
  },
  reviews:{
    type:Array,
    default:[0]
  },
  userImg: {
    type: String,
    default:
      "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
  },
  backgroundImg: {
    type: String,
    default:
      "https://fjmtstudio.com/wp-content/uploads/2016/12/Macquarie-map-size-6-1024x480.jpg",
  },
});
module.exports = mongoose.model("bandDetail", bandDetailSchema);
