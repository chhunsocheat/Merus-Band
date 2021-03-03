const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    createdDate:{
        type:Date,
        required:true,
        default:new Date(),
    },
    allReq:{
        type:Array,
        default:[]
    },
    pendingReq:{
        type:Array,
        default:[]
    },
    acceptedReq:{
        type:Array,
        default:[]
    },
    userImg:{
        type:String,
        default:"https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
    },
    backgroundImg:{
        type:String,
        default:"https://fjmtstudio.com/wp-content/uploads/2016/12/Macquarie-map-size-6-1024x480.jpg"
    },
    isBand:{
        type:Boolean,
        default:false
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

module.exports = mongoose.model("userDetail",userDetailSchema)