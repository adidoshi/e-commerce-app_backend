const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;
const errorMiddleware = require("./middleware/error");
const connectDB = require("./config/database");
// Route Imports:
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// middlewares
const app = express();
app.use(express.json());
app.use(logger("tiny"));
app.use(fileUpload());
app.use(cors());

// Initial route
app.get("/", (req, res) => {
  res.json({
    message: "Success -> server is up",
    content: `Welcome to Splash Store E-commerce application API`,
  });
});

// connect DB:
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
