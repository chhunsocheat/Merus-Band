// require('dotenv').config()
const express = require("express")
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
var config = require('./config.json');
app.use(cors())

//connecting the server using mongoose
//connecting to the db using .env file

//"mongodb+srv://socheatchhun:Socheat56@cluster0.ba7dc.mongodb.net/twitter?retryWrites=true&w=majority"
mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
   console.log("connected");
})
const db = mongoose.connection;
//when the server encounter error
db.on('error',(error)=>console.error(error))
//once it connects to the database
db.once('open',()=>console.error("Connected to DB"))
//to allow our sever to accept json files
app.use(express.json({limit:"50mb"}))




//----------------------------------------------------
//----------------------------------------------------
//Connecting different routes

//Router user authentication
const usersRouter = require("./route/auth")
const moreDetailRouter = require("./route/moredetailroute")
const requests = require("./route/requests")
const reviews = require("./route/reviews")
app.use('/users',usersRouter)
app.use('/moredetail',moreDetailRouter)
app.use('/requests',requests)
app.use('/reviews',reviews)



const port =process.env.PORT||3001;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

