import React, { useState } from 'react';
import axios from 'axios';

const RescheduleForm = () => {
  const [bookingId, setBookingId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleReschedule = (e) => {
    e.preventDefault();

    // Make the PUT request
    axios
      .put(`http://localhost:3000/bookings/${bookingId}`, { startDate, endDate })
      .then((response) => {
        setMessage(response.data.message);
        // Reset form values
        setBookingId('');
        setStartDate('');
        setEndDate('');
      })
      .catch((error) => {
        console.error('Rescheduling failed!', error);
      });
  };

  return (
    <form onSubmit={handleReschedule}>
      <div>
        <label>Booking ID:</label>
        <input
          type="text"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button type="submit">Reschedule</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RescheduleForm;
