const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        required:true,
        default:new Date(),
    },
    userImg:{
        type:String,
        default:"https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
    },
    backgroundImg:{
        type:String,
        default:"https://fjmtstudio.com/wp-content/uploads/2016/12/Macquarie-map-size-6-1024x480.jpg"
    }

    // ,
    // following:{
    //     type:String,
    //     require:true
    // },
    // follower:{
    //     type:String,
    //     require:true
    // }

})

module.exports = mongoose.model("user",userSchema)