const express=require("express");
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getProductReviews, deleteReview} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");



const router=express.Router();
 
// all routes 
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
// get all products
router.route("/products").get(getAllProducts)
// get product details
router.route("/product/:id").get(getProductDetails)
// review product 
router.route("/review").put(isAuthenticatedUser,createProductReview)
// see all review 
router.route("/reviews").get(getProductReviews);
// delete review 
router.route("/reviews").delete(isAuthenticatedUser,deleteReview)

// Creat product 
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles(["admin"]),createProduct)
// update products 
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles(["admin"]),updateProduct)
// delete product
router.route("/admin/products/:id").delete(isAuthenticatedUser,authorizeRoles(["admin"]),deleteProduct)



module.exports=router; 