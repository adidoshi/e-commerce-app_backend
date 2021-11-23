const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const errorMiddleware = require("./middleware/error");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// Route Imports:
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

// connect DB:
const connectDB = require("./config/database");
connectDB();

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", orderRouter);

// Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
