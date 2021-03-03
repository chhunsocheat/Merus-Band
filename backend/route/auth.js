const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const config = require("../config.json");
const faker= require("faker")
// const { authenticateToken } = require("../utils")
const User = require("../models/user");
const UserDetail = require("../models/userdetail");
const Band = require("../models/band");
const BandDetail = require("../models/banddetail");

//when a user click join as a band
router.post("/band", async (req, res) => {
  const { email, username, members, genre,password } = req.body;
  //   const band = new BandDetail({
  //     email,
  //     username,
  //     members,
  //     genre,
  //     isBand: true,
  //   });
  //   const savedBand = await band.save();
  //----------------------------------
  let errors = [];

  // check the fields that are required
  if (!username || !email || !password) {
    errors.push({ message: "Please fill in all the required field" });
  }
  if (!validator.isEmail(email)) {
    errors.push({ message: "Please Enter a valid email" });
  }

  if (password.length < 8) {
    errors.push({ message: "Password should be atleast 8 charecter" });
  }
  if (errors.length > 0) {
    return res.status(201).json({ message: errors });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //search for both username and email to not be the same
    const foundBand = await Band.findOne({
      $or: [{ username }, { email }],
    });
    const foundUser = await User.findOne({
        $or: [{ username }, { email }],
      });
    if (foundBand||foundUser) {
      errors.push({ message: "username or Email is already taken" });
      return res.status(201).json({
        message: errors,
      });
    }
    const band = new Band({
      username,
      password: hashedPassword,
      email,
      createdDate: new Date(),
    });
    const bandDetail = new BandDetail({
      email,
      username,
      members,
      genre,
      isBand: true,
      userImg:faker.image.people(),
      createdDate: new Date()
    });
   
 
    try {
      const bandToken = {
        username: band.username,
        emial: band.email,
      };
      const accessToken = jwt.sign(bandToken, config.SECRET);
      const newBand = await band.save();
      const newBandDetail = await bandDetail.save();
      const lastBandDetail = {
        ...newBandDetail._doc,
        accessToken,
      };
      // //(newUserDetail);
      res.status(200).json({ data: lastBandDetail });
    } catch (err) {
      //(err);
      res.status(400).json({ err: err.message });
    }
  }

  //----------------------------------
//   return res.status(200).json({ data: savedBand });
});

router.get("/picture",(req,res)=>{
  return res.send(faker.image.people())
})

//Getting all the users from userDetails Schema
router.get("/", async (req, res) => {
  try {
    const users = await UserDetail.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//route to get one user detail
router.post("/oneuser", async (req, res) => {
  let user;
  try {
    //if found a user assign it to the variable
    user = await UserDetail.findOne({ username: req.body.username });
    //if null send a status 404
    if (user === null) {
      return res.status(404).json({ message: "No user found" });
    }
    //if error send error message
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(200).json({ data: user });
});
//Login a user
router.post("/login", async (req, res) => {
  //finding a user in our db
  const user = await User.findOne({
    email: req.body.email,
  });
  const band = await Band.findOne({
    email: req.body.email,
  });

  //if found username then compare the password with the password stored in the DB
  if (user) {
    bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
      if (err) throw err;
      //when the password mamthed with the pw from the db
      if (isMatch) {
        const userToken = {
          username: user.username,
          emial: user.email,
        };
        const accessToken = jwt.sign(userToken, config.SECRET);
        //if hashed pw match with plain pw log them in

        userDetail = await UserDetail.findOne({ username: user.username });
        const newUserDetail = {
          ...userDetail._doc,
          accessToken,
        };
        return res
          .status(200)
          .json({ data: newUserDetail, message: "logged in" });
      } else {
        //else throw an error message
        return res.status(201).json({ message: "Incorrect password" });
      }
    });
  }
  else if(band){
    bcrypt.compare(req.body.password, band.password, async (err, isMatch) => {
        if (err) throw err;
        //when the password mamthed with the pw from the db
        if (isMatch) {
          const bandToken = {
            username: band.username,
            emial: band.email,
          };
          const accessToken = jwt.sign(bandToken, config.SECRET);
          //if hashed pw match with plain pw log them in
  
          bandDetail = await BandDetail.findOne({ username: band.username });
          const newBandDetail = {
            ...bandDetail._doc,
            accessToken,
          };
          return res
            .status(200)
            .json({ data: newBandDetail, message: "logged in" });
        } else {
          //else throw an error message
          return res.status(201).json({ message: "Incorrect password" });
        }
      });
  }
  else if(!user||!band) {
    return res.status(201).json({ message: "Email not found" });
  }
});
//Geeting one client
router.get("/:clientname", getClient, (req, res) => {
  res.send(res.client);
});

router.get("/user/:username", getClient, (req, res) => {
  res.send(res.user);
});

//Creating a user
router.post("/", async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  // check the fields that are required
  if (!username || !email || !password || !password2) {
    errors.push({ message: "Please fill in all the required field" });
  }
  if (!validator.isEmail(email)) {
    errors.push({ message: "Please Enter a valid email" });
  }
  if (password !== password2) {
    errors.push({ message: "Passwords doesnt match" });
  }
  if (password.length < 8) {
    errors.push({ message: "Password is too short" });
  }
  if (errors.length > 0) {
    return res.status(201).json({ message: errors });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //search for both username and email to not be the same
    const foundUsername = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (foundUsername) {
      errors.push({ message: "Username or Email is already taken" });
      return res.status(201).json({
        message: errors,
      });
    }
    const user = new User({
      username,
      password: hashedPassword,
      email,
      createdDate: new Date(),
    });
    const userDetail = new UserDetail({
      username,
      email,
      createdDate: new Date(),
      userImg:faker.image.people()
      
    });
    //create new User Class Schema
    //Save the user to database when success
    try {
      const userToken = {
        username: user.username,
        emial: user.email,
      };
      const accessToken = jwt.sign(userToken, config.SECRET);
      const newUser = await user.save();
      const newUserDetail = await userDetail.save();
      const lastUserDetail = {
        ...newUserDetail._doc,
        accessToken,
      };
      // //(newUserDetail);
      res.status(200).json({ data: lastUserDetail });
    } catch (err) {
      //(err);
      res.status(400).json({ err: err.message });
    }
  }
});

//Updating user
router.patch("/:id", getClient, async (req, res) => {
  //check if the username and password field is not empty
  if (req.body.username !== null) {
    res.user.username = req.body.username;
  }
  if (req.body.password !== null) {
    res.user.password = req.body.password;
  }
  //update the new field by using save()
  try {
    const updatedUser = await res.user.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//Delete a user
router.delete("/:username", getClient, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// to change the profile of a user
router.post("/changeprofile", async (req, res) => {
  const { username, profileUrl } = req.body;
  try {
    //if found a user assign it to the variable
    user = await UserDetail.update(
      { username: req.body.username },
      {
        $set: {
          userImg: profileUrl,
        },
      }
    );
    let user = await UserDetail.findOne({ username: req.params.username });
    return res.status(200).json({ data: user });
  } catch (err) {}
});

//function to get the id of the client
async function getClient(req, res, next) {
    const {clientname}= req.params
  //declare a user varialbe
  let client;
  try {
    //if found a user assign it to the variable
    client = await UserDetail.findOne({ username:clientname});
    //if null send a status 404
    if (client === null) {
        client = await BandDetail.findOne({username:clientname});
    }
    if (client === null) {
      return res.status(404).json({ message: "No Client found" });
    }
    //if error send error message
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //the respond of the function when used in the end-point
  res.client = client;
  next();
}

//auth.js is mainly the route for authenticating user to the site for example 
//the sign up and the sign in process all included in this file.


module.exports = router;
