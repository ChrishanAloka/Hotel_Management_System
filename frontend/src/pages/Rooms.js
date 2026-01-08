// frontend/src/pages/Rooms.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { roomAPI } from '../services/api';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

const Rooms = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState(
    searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')) : new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')) : new Date(Date.now() + 86400000)
  );
  const [roomType, setRoomType] = useState('');

  useEffect(() => {
    fetchRooms();
  }, [checkInDate, checkOutDate, roomType]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const params = {
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString()
      };
      
      if (roomType) {
        params.roomType = roomType;
      }

      const response = await roomAPI.getAvailableRooms(params);
      setRooms(response.data);
    } catch (error) {
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (roomId) => {
    navigate(`/book/${roomId}?checkIn=${checkInDate.toISOString()}&checkOut=${checkOutDate.toISOString()}`);
  };

  const calculateNights = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) return <div className="loading">Loading rooms...</div>;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1 className="mb-4">Available Rooms</h1>

      <div className="card mb-4">
        <h3 className="card-title">Search Filters</h3>
        <div className="grid grid-3">
          <div className="form-group">
            <label className="form-label">Check-in Date</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              className="form-control"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Check-out Date</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={checkInDate}
              className="form-control"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Room Type</label>
            <select
              className="form-control"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Presidential">Presidential</option>
            </select>
          </div>
        </div>
        <p className="mt-2"><strong>Nights:</strong> {calculateNights()}</p>
      </div>

      {rooms.length === 0 ? (
        <div className="card text-center">
          <p>No rooms available for the selected dates.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {rooms.map((room) => (
            <div key={room._id} className="room-card">
              <div className="room-image">
                {room.images && room.images[0] ? (
                  <img src={room.images[0]} alt={room.roomType} />
                ) : (
                  <div style={{ 
                    height: '200px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#ecf0f1',
                    fontSize: '3rem'
                  }}>
                    🏨
                  </div>
                )}
              </div>
              <div className="room-details">
                <h3 className="room-type">{room.roomType} - Room {room.roomNumber}</h3>
                <p><strong>Capacity:</strong> {room.capacity} guests</p>
                <p><strong>Floor:</strong> {room.floor}</p>
                
                {room.amenities && room.amenities.length > 0 && (
                  <p><strong>Amenities:</strong> {room.amenities.join(', ')}</p>
                )}
                
                {room.description && <p>{room.description}</p>}
                
                <div className="room-price">₹{room.price} / night</div>
                <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                  Total: ₹{room.price * calculateNights()} for {calculateNights()} night(s)
                </p>
                
                <button 
                  onClick={() => handleBookNow(room._id)} 
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;