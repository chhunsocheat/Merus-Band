const express = require("express");
const router = express.Router();
const UserDetail = require("../models/userdetail");
const BandDetail = require("../models/banddetail");
const {authenticateToken} = require("./utils")
/**
//route to add detail to the band
 */
router.post("/adddetail",authenticateToken, async (req, res) => {
  const { username, bandTitle, bandDescription, bandPrice,bandPhoneNumber } = req.body;
  const moreBandDetail = {
    bandTitle,
    bandDescription,
    bandPrice,
    bandPhoneNumber
  };
  if(bandTitle.length<=0||bandDescription.length<=0||bandPrice.length<=0){
      return res.status(201).json({message:"Please Fill in the Required fields"})
  }
  await BandDetail.updateOne(
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


  router.post("/changeprofile",async(req,res)=>{
    const {username,profileUrl}= req.body;
    try {
      let user;
      user = await BandDetail.updateOne({
        username,
      },{
        $set:{
          userImg:profileUrl
        }
      })
    return res.json({message:"Updated Profile Success",user})
      
    } catch (error) {
      console.log(error);
    }
    return res.json({message:"Updated Profile Not Success"})

  })

  router.post("/changeprofileuser",async(req,res)=>{
    const {username,profileUrl}= req.body;
    try {
      let user;
      user = await UserDetail.updateOne({
        username,
      },{
        $set:{
          userImg:profileUrl
        }
      })
    return res.json({message:"Updated Profile Success",user})
      
    } catch (error) {
      console.log(error);
    }
    return res.json({message:"Updated Profile Not Success"})

  })

module.exports = router;
