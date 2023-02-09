const Order=require("../models/oderModel")
const Product=require("../models/productModel")
const ErrorHandler=require("../utils/errorHandler");
// const {catchAsyncErrors}=require("../middleWare/catchAsyncErrors") 


// create new oder
exports.newOrder=async(req,res,next)=>{
    try {
    const{shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice}=req.body

        const order= await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id
        })

        res.status(200).json({
            success:true,
            order
        })
    } catch (error) {
        throw error
    }

}

// get single order 
exports.getSingleOrder= async(req,res,next)=>{
    try {
    const order= await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }
    res.status(200).json({
        success:true,
        order
    })
} catch (error) {
    throw error     
}

}


// get loggedIn user order 
exports.myOrder= async(req,res,next)=>{
    try {
    console.log(req.user)
     const orders= await Order.findOne({user:req.user._id})

     if(!orders){
        return next(new ErrorHandler("No order found",404));
    }

    res.status(200).json({
        success:true,
        orders
    })
} catch (error) {
    throw error    
}
}


// admin function 
// get all orders -- admin
exports.getAllOrder= async(req,res,next)=>{
    try {
    const orders= await Order.find()

    if(!orders){
        return next(new ErrorHandler("No order found",404));
    }

    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
} catch (error) {
        throw error
}

}

// change order status  -- admin
exports.changeOrderStatus= async(req,res,next)=>{
    try {
        
   
    const order= await Order.findById(req.params.id)
     
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product._id,order.quantity)
    })

    order.orderStatus=req.body.status

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
} catch (error) {
        throw error
}
    
}

  async function updateStock(id,quantity){
    try {
        const product= await Product.findById(id)

        
    
        //  console.log(product)
    product.Stock -= quantity;
      console.log(product.Stock)

    await product.save({})
    } catch (error) {
        console.log(error)
    }
    
  }


  // delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
    try {
        
    
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
} catch (error) {
      throw error  
}
  };


