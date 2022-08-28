const expresss= require('express');
const app=expresss();
const errorMiddleWare= require('./middleWare/error');
const cookieParser=require("cookie-parser")
const bodyParser= require("body-parser")
const fileUpload=require("express-fileupload")


app.use(expresss.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// route imports 
const product= require("./routes/productRoute");
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")

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

//ErrorMiddleWare
app.use(errorMiddleWare);


module.exports=app;