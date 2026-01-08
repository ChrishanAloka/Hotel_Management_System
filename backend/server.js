const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Import db.js

const authRoute = require("./routes/authRoute");
const path = require("path");
const app = express();

// Load environment variables
dotenv.config();

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/rooms", require("./routes/roomRoute"));
app.use("/api/bookings", require("./routes/bookingRoute"));
app.use("/api/payments", require("./routes/paymentRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));