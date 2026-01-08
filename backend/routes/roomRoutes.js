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
const { protect, authorize } = require("../middleware/auth");

router.get("/", getRooms);
router.get("/available", getAvailableRooms);
router.get("/:id", getRoom);
router.post("/", protect, authorize("admin", "staff"), addRoom);
router.put("/:id", protect, authorize("admin", "staff"), updateRoom);
router.delete("/:id", protect, authorize("admin"), deleteRoom);

module.exports = router;