const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create product - admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//  get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    let products = await apiFeatures.query;
    let filteredProductsCount=products.length;
    apiFeatures.pagination(resultPerPage);
  
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount
  });
});
// get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update product using id -admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.findById(req.params.id);
  if (!products) {
    // return res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
    return next(new ErrorHandler("Product Not Found", 404));
  }
  products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    products,
  });
});

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.findById(req.params.id);
  if (!products) {
    // return res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
    return next(new ErrorHandler("Product Not Found", 404));
  }
  await products.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// adding review to the product
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review { not working}
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  // let ratings = 0;

  // if (reviews.length === 0) {
  //   ratings = 0;
  // } else {
  //   ratings = avg / reviews.length;
  // }
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  product.reviews = reviews;
  product.ratings = ratings;
  product.numOfReviews = numOfReviews;
  product.save();

  // await Product.findByIdAndUpdate(
  //   { _id: req.query.productId },
  //   {
  //     reviews,
  //     ratings,
  //     numOfReviews,
  //   },
  //   {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   }
  // );

  res.status(200).json({
    success: true,
  });
});
