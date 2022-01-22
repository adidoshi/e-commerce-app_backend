const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  razorpayPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeApiKey").get(isAuthenticatedUser, sendStripeApiKey);

router.route("/payment/razorpay").post(isAuthenticatedUser, razorpayPayment);

module.exports = router;
