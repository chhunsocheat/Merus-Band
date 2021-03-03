const express = require("express");
const router = express.Router();
const User = require("../models/user");
const UserDetail = require("../models/userdetail");
const Band = require("../models/band");
const BandDetail = require("../models/banddetail");

/**
//route to add detail to the band
 */
router.post("/adddetail", async (req, res) => {
  const { username, bandTitle, bandDescription, bandPrice,bandPhoneNumber } = req.body;
  const moreBandDetail = {
    bandTitle,
    bandDescription,
    bandPrice,
    bandPhoneNumber
  };
  if(bandTitle.length===0||bandDescription.length===0||bandPrice.length===0){
      return res.status(201).json({message:"Please Fill in the Required fields"})
  }
  const band = await BandDetail.updateOne(
      {username},
      {
          $set:{
            description:moreBandDetail
          }
      })

      const bandData= await BandDetail.findOne({username})

      return res.send(bandData)
});
/**
 * route for add vdo to the band
 */
router.post("/addvdourl", async (req, res) => {
    const { username, vdoUrl,vdoDescription,vdoTitle } = req.body;
    if(vdoUrl.length===0||vdoDescription.length===0){
      return res.status(201).json({message:"Please Fill in the Required fields"})
  }
   const vdo = {
     vdoUrl,
     vdoDescription,
     vdoTitle
   }
    const band = await BandDetail.updateOne(
        {username},
        {
            $push:{
                videos:vdo
            }
        })
  
        return res.send(band)
  });

module.exports = router;
