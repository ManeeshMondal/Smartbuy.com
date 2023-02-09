// const {catchAsyncErrors} = require("../middleWare/catchAsyncErrors"); 
const ErrorHandler=require("../utils/errorHandler")
const User= require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail= require("../utils/sendEmail")
const crypto=require('crypto')
const cloudinary= require("cloudinary")




// Create new user 
exports.registerUser=async(req,res,next)=>{
  try {
    
  
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
    const{name,email,password, avatar}=req.body;

    // console.log(" avatar",  avatar)
    const user=await User.create({
        name,email,password,
        avatar: avatar
        // https://www.bezkoder.com/node-js-upload-store-images-mongodb/
        // {
        //     public_id:avatar,
        //     url:  avatar,
            
        // }
    })
    sendToken(user,201,res)
  } catch (error) {
    next(error)
  }
}



// login user 
exports.loginUser=async(req,res,next)=>{
  try {
  const{email, password}=req.body;
     console.log({email})
     console.log({password})

    // check if the user has given the email and password both 
    if(!email||!password){
        throw new ErrorHandler("Please Enter Email and Password",400);
    }

    // finding  in the database with the entered email and passwrod 
    const user=await User.findOne({email:email}).select("+password")
    console.log({user})
    // if there is no such user 
    if(!user){
       throw new ErrorHandler("Please Enter Valid Login Credentials",401);
    }
    
    const isPasswordMatched= await user.comparePassword(password)
    console.log("==========================",isPasswordMatched,"==========")
    // if Password does not match 
    if(!isPasswordMatched){
       throw new ErrorHandler("Please Enter Valid Login Credentials",401);
    }
    // if password matched 
    // sendToken(user,200,res)
    // const token =  user.getJWTToken(user);
    // console.log({token})
    res.status(200).send({
      data:{success: true,
      user,
      token,}
    })
  } catch (error) {
    console.log({error})
     next(error)
  }
}



// logut 
exports.logOut=async(req,res,next)=>{
  try {
   res.cookie("token",null,{
       expires:new Date(Date.now()),
       httpOnly:true
   })

    res.status(200).json({
        success:true,
        message:"Logged Out succeccfully"
    })
  } catch (error) {
     next(error)
  }
}



//  forgot password 
exports.forgotPassword=async(req,res,next)=>{
     try {
      const user= await User.findOne({email:req.body.email}) // find the user with the particular email
      console.log(user,"PASSED1")
      if(!user){
        return next(new ErrorHandler("No User Found",400));
      }

    //   get reset password token 
    const resetToken= await user.getResetPasswordToken();
    console.log(resetToken,"PASSED2")


    // now need to save the reset token in the userschema in the database 
    await user.save({validateBeforeSave:false});

    // reset password url 
    const resetPasswordURL= `${req.protocol}//${req.get("Host")}/api/v1/password/reset/${resetToken}`

    const message= `Your password reset url is:-\n \n ${resetPasswordURL}\n If you have not requested this please ignore.`;

    // console.log(user.email,"PASSED3")

    // now time to sending the message 
    try {
       
        await sendEmail({
            email:user.email,
            subject:`Ecommerse password recovery`,
            message :message
        })
        console.log("PASSED4")
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully.`
        })

    } catch (error) {
      console.log(error)
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire= undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));     
    }
  } catch (error) {
      throw error
  }

}



// Reset Password
exports.resetPassword = async (req, res, next) => {
    try {
      
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHander(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  } catch (error) {
      throw error 
  }
  };




 // get user details 
 exports.getUserDetails=async(req,res,next)=>{
  try {
    
  
    const user= await User.findById(req.user.id);
    // console.log(req.user)
    console.log({user})
    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
     next(error) 
  }
 }



 // update user password
 exports.updatePassword=async(req,res,next)=>{
  try {
    
  
  const user= await User.findById(req.user.id).select("+password");

  const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

   // if Password does not match 
   if(!isPasswordMatched){
    return next(new ErrorHandler("Old password is incorrect",400));
   }

   if(req.body.newPassword!=req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match",400));
   }
    
  user.password=req.body.newPassword;
  await user.save();

  // res.json({message:"Password changed successfully "})
  sendToken(user,200,res);
} catch (error) {
    throw error
}

}



// update user profile
exports.updateProfile=async(req,res,next)=>{
   try {
    
  const  newUserDetails={
     name: req.body.name,
     email: req.body.email
  }

  // adding the cloudinary 
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user=await User.findByIdAndUpdate(req.user.id,newUserDetails,{
    new:true,
    runValidators: true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
    message: "Your profile updated successfully"
  })
} catch (error) {
    throw error
}
}



// for admin some function 

// get all users (admin)
exports.getAllUsers= async(req,res,next)=>{
  try {
  const users=await User.find();

  res.status(200).json({
    success:true,
    users
  })
} catch (error) {
    throw error 
}
}



// get every single user details (admin)
 exports.getSingleUserDetails=async(req,res,next)=>{
  try {
  const user= await User.findById(req.params.id);

  if(!user){
    return next(ErrorHandler(`User does not exist with this id ${req.params.id}`),400);
  }

  res.status(200).json({
    success:true,
    user
  })
} catch (error) {
    throw error
}
 }


 // update user role(admin)
exports.updateRole=async(req,res,next)=>{
  try {
  const  newUserDetails={
     name: req.body.name,
     email: req.body.email,
     role:req.body.role
  }

  const user=await User.findByIdAndUpdate(req.params.id,newUserDetails,{
    new:true,
    runValidators: true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
  })
} catch (error) {
    throw error
}
}


// delete user(admin)
exports.deleteUser=async(req,res,next)=>{
   try {
  const user= await User.findById(req.params.id)
  //  to do : deleting  the cloudinary 

  if(!user){
    return next(ErrorHandler(`User does not exist with this id ${req.params.id}`),400);
  }
 
  await user.remove();

  res.status(200).json({
    success:true,
    message:`User with the id=${req.params.id} is removed `
  })
} catch (error) {
    throw error
}
}