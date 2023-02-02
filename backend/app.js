const expresss= require('express');
const app=expresss();
const errorMiddleWare= require('./middleWare/error');
const cookieParser=require("cookie-parser")
const bodyParser= require("body-parser")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")

app.use((req,res,next)=>{
    console.log(req);
    next()
})
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

const cors = require('cors');
const corsOptions ={
    origin:'https://smartbuycom-production.up.railway.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cors());
{
    
    // origin:["https://smartbuy-com.vercel.app/","https://smartbuy-o5fjj7y4p-maneeshmondal.vercel.app/","smartbuy-lqy26bln9-maneeshmondal.vercel.app"],
    // default:"https://smartbuy-o5fjj7y4p-maneeshmondal.vercel.app/"
    // origin:"*"
    // origin:"https://smartbuycom-production.up.railway.app/"
}
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//       next();
//     });
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