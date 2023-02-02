const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs")
const JWT=require("jsonwebtoken");
const crypto=require("crypto")


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  });
  
  //  password hashing 
   userSchema.pre("save",async function(next) {
      // password changing case 
       if(!this.isModified("password")){
        next();
       }  
       
       this.password=await bcrypt.hash(this.password,10)
   })

  //  JWT authentication 
  userSchema.methods.getJWTToken=function(user){
       console.log("============",process.env.JWT_SECRET)
      return JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
      })
  }

  // password matching
  userSchema.methods.comparePassword=async function(enteredPassword){
       return  bcrypt.compare(enteredPassword,this.password);
  }

  // generating password reset token  
  userSchema.methods.getResetPasswordToken=async function(){
    
       // generating token 
    const resetToken= crypto.randomBytes(20).toString("hex");

       //  hashing and adding resetpasswordtoken to usershema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

       // resetpasswordtoke exrirey set up
    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resetToken;
  }

  module.exports = mongoose.model("User", userSchema);