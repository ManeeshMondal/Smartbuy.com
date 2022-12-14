const expresss= require('express');
const app=expresss();
const errorMiddleWare= require('./middleWare/error');
const cookieParser=require("cookie-parser")
const bodyParser= require("body-parser")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")


app.use(expresss.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// config 
dotenv.config({path:"backend/config/config.env"}) 

// route imports 
const product= require("./routes/productRoute");
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")
const payment = require("./routes/paymentRoutes")

const cors = require('cors');
app.use(cors(
    {
        credentials: true, 
        origin: 'http://localhost:3000'
    }
));
// routes 
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

//ErrorMiddleWare
app.use(errorMiddleWare);


module.exports=app;