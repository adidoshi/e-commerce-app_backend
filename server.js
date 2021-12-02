const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.json({
    message: "Success -> server is up",
    content: `Welcome to Splash Store E-commerce application API`,
  });
});

// Route Imports:
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");

// connect DB:
const connectDB = require("./config/database");
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

// Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
