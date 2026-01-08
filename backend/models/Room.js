// backend/models/Room.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    required: true,
    enum: ["Single", "Double", "Suite", "Deluxe", "Presidential"]
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }],
  description: {
    type: String
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance", "reserved"],
    default: "available"
  },
  floor: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Room", roomSchema);