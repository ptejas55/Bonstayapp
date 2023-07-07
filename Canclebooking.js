import React, { useState } from 'react';
import axios from 'axios';

const BookingCancellation = () => {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

  const handleCancel = () => {
    // Make the DELETE request
    axios
      .delete(`http://localhost:3000/bookings/${bookingId}`)
      .then((response) => {
        setMessage(response.data.message);
        setBookingId('');
      })
      .catch((error) => {
        console.error('Cancellation failed!', error);
      });
  };

  return (
    <div>
      <label>Booking ID:</label>
      <input
        type="text"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />

      <button type="button" onClick={handleCancel}>
        Cancel Booking
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingCancellation;
