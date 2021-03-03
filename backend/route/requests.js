const express = require("express");
const router = express.Router();
const UserDetail = require("../models/userdetail");
const BandDetail = require("../models/banddetail");
const Requests = require("../models/requests");
/**
 * route to request for all bands
 */
router.get("/allbands", async (req, res) => {
  const allBands = await BandDetail.find().limit(6);
  return res.send(allBands)
})
router.get("/allbands/:genre", async (req, res) => {
  const { genre } = req.params;
  const allBands = await BandDetail.find({
    genre: {
      $in:[genre]
    }
  }).limit(6);
  return res.send(allBands)
})
//all requests routes
//-------------------------------------------------------------

router.post("/getuserpendingrequests", async (req, res) => {
  const { username } = req.body;
  const reqDetail = await Requests.find({
    $and: [
      { requestedByUsername: username },
      { isAccepted: false }
    ]
  })
  return res.send(reqDetail)
})
/**
 * route to get all user accepted request
 */
router.post("/getuseracceptedrequests", async (req, res) => {
  const { username } = req.body;
  const reqDetail = await Requests.find({
    $and: [
      { requestedByUsername: username },
      { isAccepted: true }
    ]
  })
  return res.send(reqDetail)
})
/**
 * route to get all band pending request
 */
router.post("/getbandpendingrequests", async (req, res) => {
  const { bandname } = req.body;
  const reqDetail = await Requests.find({
    $and: [
      { requestedToUsername: bandname },
      { isAccepted: false }
    ]
  })
  return res.send(reqDetail)
})
/**
 * route to get all band accepted request
 */
router.post("/getbandacceptedrequests", async (req, res) => {
  const { bandname } = req.body;
  const reqDetail = await Requests.find({
    $and: [
      { requestedToUsername: bandname },
      { isAccepted: true }
    ]
  })
  return res.send(reqDetail)
})
/**
 * route to handle to accept logic
 */
router.post("/acceptrequest", async (req, res) => {
  const { username, bandname, id } = req.body;
  const reques = [];
  try {
    request = await Requests.updateOne({ _id: id },
      {
        $set: {
          isAccepted: true
        }
      })
  } catch (error) {
    return res.status(200).json({ message: error, data: res })

  }

  return res.status(200).json({ message: "accepted the request", data: request })
})
/**
 * route to decline the request logic
 */
router.post("/declinerequest", async (req, res) => {
  const { username, bandname, id } = req.body;
  const deletedRequest = await Requests.findOneAndDelete({ "_id": id })
  res.status(200).json({ message: "Deleted Successfully", data: deletedRequest })
})


//-------------------------------------------------------------
/**
 * route for when a user is making a booking to the band
 */
router.post("/clientrequest", async (req, res) => {
  const { username, bandname, offerPrice, requestMessage, location, date } = req.body;
  const bookingDetail = {

    requestedByUsername: username,
    requestedToUsername: bandname,

    offerPrice,
    requestMessage,
    location,
    date,
  };
  const requestDetail = new Requests({
    requestedByUsername: username,
    requestedToUsername: bandname,

    offerPrice,
    requestMessage,
    location,
    date,
  });
  const clientBookingDetail = {
    requestedByUsername: username,
    requestedToUsername: bandname,

    offerPrice,
    requestMessage,
    location,
    date,
  };
  if (
    offerPrice.length === 0 ||
    requestMessage.length === 0 ||
    location.length === 0 ||
    date.length === 0
  ) {
    return res
      .status(201)
      .json({ message: "Please Fill in the Required fields" });
  }
  const request = await requestDetail.save()
  const bandRes = await BandDetail.updateOne(
    { username: bandname },
    {
      $push: {
        pendingReq: request,
      },
    }
  );
  const userRes = await UserDetail.updateOne(
    { username: username },
    {
      $push: {
        pendingReq: request,
      },
    }
  );
  const bandData = await BandDetail.findOne({ username: bandname });

  return res.send(bandData);
});

module.exports = router;
