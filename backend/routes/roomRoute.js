// backend/routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const {
  getRooms,
  getAvailableRooms,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware(["admin", "kitchen", "cashier"]), getRooms);
router.get("/available", authMiddleware(["admin", "kitchen", "cashier"]), getAvailableRooms);
router.get("/:id", authMiddleware(["admin", "kitchen", "cashier"]), getRoom);
router.post("/", authMiddleware(["admin", "kitchen", "cashier"]), addRoom);
router.put("/:id", authMiddleware(["admin", "kitchen", "cashier"]), updateRoom);
router.delete("/:id", authMiddleware(["admin", "kitchen", "cashier"]), deleteRoom);

module.exports = router;

