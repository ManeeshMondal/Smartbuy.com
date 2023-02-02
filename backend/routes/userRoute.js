const express=require("express");
const {registerUser, loginUser,forgotPassword,resetPassword, logOut, getUserDetails, updatePassword, updateProfile, getAllUsers,getSingleUserDetails, updateRole, deleteUser}=require("../controllers/userControler");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");

 

const router=express.Router();

// All Routes

// Creat new user
router.route("/register").post(registerUser)

// Log in user
router.route("/signIn").post(loginUser)

// forgot password 
router.route("/password/forgot").post(forgotPassword)

// reset password
router.route("/password/reset/:token").put(resetPassword);

// get user details 
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// change password 
router.route("/password/update").put(isAuthenticatedUser,updatePassword)

// update profile 
router.route("/me/update").put(isAuthenticatedUser,updateProfile)

//Log out
router.route("/logout").get(logOut)



// admin routes

// get all users 
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"),getAllUsers)

// get single user details
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUserDetails)

//change role of the user 
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateRole)

//remove user 
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)


module.exports=router; 