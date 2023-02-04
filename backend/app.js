const expresss= require('express');
const app=expresss();
const errorMiddleWare= require('./middleWare/error');
const cookieParser=require("cookie-parser")
const bodyParser= require("body-parser")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")

var cors = require('cors');

const corsOrigin ={
    origin:["https://smartbuy-com.vercel.app/","https://smartbuy-r6cmy3f2n-maneeshmondal.vercel.app"], //or whatever port your frontend is using
    // origin:"http://localhost:3000", //or whatever port your frontend is using 
   // origin:true, //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.use((req,res,next)=>{
//     console.log(req);
//     next()
// })
app.use(expresss.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// config 
dotenv.config({path:"config/config.env"}) 

// route imports 
const product= require("./routes/productRoute");
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")
// const payment = require("./routes/paymentRoutes")


// {
    
    // origin:["https://smartbuy-com.vercel.app/","https://smartbuy-o5fjj7y4p-maneeshmondal.vercel.app/","smartbuy-lqy26bln9-maneeshmondal.vercel.app"],
    // default:"https://smartbuy-o5fjj7y4p-maneeshmondal.vercel.app/"
    // origin:"*"
// }
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
    // });
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// routes 
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order)
// app.use("/api/v1",payment)

//ErrorMiddleWare
app.use(errorMiddleWare);


module.exports=app;