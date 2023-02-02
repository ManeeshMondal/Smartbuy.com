const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

// checking if it logged in or not 
 exports.isAuthenticatedUser=async(req,res,next)=>{

    const {token}= req.cookies;

   console.log({token})
     
    if(!token){
        throw new ErrorHandler("Please Login to continue",401);
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req["user"]= await User.findById(decodedData.id);
    next();
    
}

// authorization
exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce`,
            403
          )
        );
      }
  
      next();
    };
  };


