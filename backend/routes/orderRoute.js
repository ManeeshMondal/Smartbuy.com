const express=require("express");
const { newOrder, getSingleOrder, myOrder, getAllOrder, changeOrderStatus, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");


const router=express.Router();

// all routes 
router.route("/order/new").put(isAuthenticatedUser,newOrder)

// get single order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

// get loggedIn user order 
router.route("/order/me").post(isAuthenticatedUser, myOrder)


// admin routes 
// get all orders 
router.route("/admin/order/all").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrder)

// update order status 
router.route("/admin/order/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),changeOrderStatus)

// delete order 
router.route("/admin/order/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)


module.exports=router;