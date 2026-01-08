// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const {
  getBookings,
  getMyBookings,
  getBookingsByDate,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  deleteBooking
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware(["admin", "kitchen", "cashier"]), getBookings);
router.get("/my-bookings", authMiddleware(["admin", "kitchen", "cashier"]), getMyBookings);
router.get("/by-date", authMiddleware(["admin", "kitchen", "cashier"]), getBookingsByDate);
router.get("/:id", authMiddleware(["admin", "kitchen", "cashier"]), getBooking);
router.post("/", authMiddleware(["admin", "kitchen", "cashier"]), createBooking);
router.put("/:id", authMiddleware(["admin", "kitchen", "cashier"]), updateBooking);
router.put("/:id/cancel", authMiddleware(["admin", "kitchen", "cashier"]), cancelBooking);
router.delete("/:id", authMiddleware(["admin", "kitchen", "cashier"]), deleteBooking);

module.exports = router;