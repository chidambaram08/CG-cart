const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//Get Products - http://localhost:8000/api/v1/product
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;
 

    let buildQuery = () => {
      return  new APIFeatures(Product.find(), req.query).search().filter()
      
    }

     const filteredProductsCount = await buildQuery().query.countDocuments({});
     const totalProductsCount = await Product.countDocuments({});

     let productsCount = totalProductsCount;

     if(filteredProductsCount !== totalProductsCount){
       productsCount = filteredProductsCount;
      
     }

  const products = await buildQuery().paginate(resPerPage).query;
 
  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products
  });
  console.log(products);
});

//Create Product /api/v1/product/new
exports.newProducts = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//Get single products  -/api/v1/product/:id
exports.getSingleProducts = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    {
      next(new ErrorHandler("Product not found", 400));
    }
  }
});

//Update Product -/api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  try {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    {
      return res.status(404).json({
        success: false,
        message: "Prduct is not available ",
      });
    }
  }
});

//Delete Product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    {
      return res.status(404).json({
        success: false,
        message: "Product is not available ",
      });
    }
  }
});

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.body.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);

  //finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //Updating review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //Creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get Reviews - /api/v1/reviews?id={proudctId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Reviews - /api/v1/review
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //filtering the reviews whcih does not match the deleting reviews id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  //number of reviews
  const numOfReviews = reviews.length;

  //finding the average with the filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;

  ratings = isNaN(ratings) ? 0 : ratings;

  // save the product data
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });

  res.status(200).json({
    success: true,
  });
});
