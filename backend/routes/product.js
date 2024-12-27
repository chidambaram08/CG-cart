const express = require("express");
const {
  getProducts,
  newProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/authenicate");
const { authorizeRoles } = require("../middlewares/authenicate");
const router = express.Router();

router.route("/product").get( getProducts); // product uri and handler funciton show what to do

router.route("/product/:id").get(getSingleProducts);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/review").put(isAuthenticatedUser ,createReview)  ;
router.route("/reviews").get(getReviews);
router.route("/reviews").delete(deleteReviews)


//Admin Routes 
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProducts);

module.exports = router;
