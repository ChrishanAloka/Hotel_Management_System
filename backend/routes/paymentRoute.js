// backend/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPayments,
  getPaymentsByDate,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment
} = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware(["admin", "kitchen", "cashier"]), getPayments);
router.get("/by-date", authMiddleware(["admin", "kitchen", "cashier"]), getPaymentsByDate);
router.get("/:id", authMiddleware(["admin", "kitchen", "cashier"]), getPayment);
router.post("/", authMiddleware(["admin", "kitchen", "cashier"]), createPayment);
router.put("/:id", authMiddleware(["admin", "kitchen", "cashier"]), updatePayment);
router.delete("/:id", authMiddleware(["admin", "kitchen", "cashier"]), deletePayment);


module.exports = router;