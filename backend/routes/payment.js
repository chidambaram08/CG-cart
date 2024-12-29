const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenicate");
const { processPayment, sendStripeApi } = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;