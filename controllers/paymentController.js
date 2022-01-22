const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const shortid = require("shortid");
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.razorpayPayment = catchAsyncError(async (req, res, next) => {
  const options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: shortid.generate(),
  };

  try {
    const response = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      details: response,
    });
  } catch (error) {
    res.status(400).json(`Error occured -${error}`);
    console.log(error);
  }
});

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Splash Store Ecommerce",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
