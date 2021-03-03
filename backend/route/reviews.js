const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");
const BandDetail = require("../models/banddetail");
/**
 * route for when a user add a review on the band
 */
router.post("/addreview", async (req, res) => {
    const { userImg, reviewMessage, reviewRating, reviewByUsername, reviewToUsername } = req.body;
    const reviewObj = new Reviews({
        userImg,
        reviewMessage,
        reviewRating,
        reviewByUsername,
        reviewToUsername,
        date: new Date()
    })
    const bandRating=await BandDetail.updateOne(
        { username: reviewToUsername },
        {
            $push: {
                reviews: reviewRating
            }
        })
    const reviewData = await reviewObj.save();
    //(bandRating);
    return res.send(reviewData)
})
/**
 * route for getting a review for one user
 */
router.get("/getreviews/:username",async(req,res)=>{
    const {username} = req.params;
    const userReviews= await Reviews.find({
        reviewToUsername:username
    })
    return res.send(userReviews)
})


module.exports = router;