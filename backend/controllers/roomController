// backend/controllers/roomController.js
const mongoose = require("mongoose");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to load rooms" });
  }
};

// Get available rooms by date range
exports.getAvailableRooms = async (req, res) => {
  const { checkInDate, checkOutDate, roomType } = req.query;

  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({ error: "Check-in and check-out dates are required" });
  }

  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Find all bookings that overlap with the requested dates
    const overlappingBookings = await Booking.find({
      bookingStatus: { $nin: ["cancelled", "checked-out"] },
      $or: [
        {
          checkInDate: { $lte: checkOut },
          checkOutDate: { $gte: checkIn }
        }
      ]
    }).select("room");

    const bookedRoomIds = overlappingBookings.map(booking => booking.room);

    // Find rooms that are not booked
    const query = {
      _id: { $nin: bookedRoomIds },
      status: "available"
    };

    if (roomType) {
      query.roomType = roomType;
    }

    const availableRooms = await Room.find(query).sort({ price: 1 });

    res.json(availableRooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to load available rooms" });
  }
};

// Get single room
exports.getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Failed to load room" });
  }
};

// Add new room (Admin only)
exports.addRoom = async (req, res) => {
  const { roomNumber, roomType, price, capacity, amenities, description, images, floor } = req.body;

  if (!roomNumber || !roomType || !price || !capacity || !floor) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  try {
    const roomExists = await Room.findOne({ roomNumber });

    if (roomExists) {
      return res.status(400).json({ error: "Room number already exists" });
    }

    const newRoom = new Room({
      roomNumber,
      roomType,
      price,
      capacity,
      amenities: amenities || [],
      description,
      images: images || [],
      floor
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: "Failed to add room" });
  }
};

// Update room (Admin only)
exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const room = await Room.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Failed to update room" });
  }
};

// Delete room (Admin only)
exports.deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Check if room has active bookings
    const activeBookings = await Booking.findOne({
      room: id,
      bookingStatus: { $nin: ["cancelled", "checked-out"] }
    });

    if (activeBookings) {
      return res.status(400).json({ error: "Cannot delete room with active bookings" });
    }

    await Room.findByIdAndDelete(id);
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete room" });
  }
};