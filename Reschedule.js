import React, { useState } from 'react';
import axios from 'axios';

const RescheduleForm = () => {
  const [bookingId, setBookingId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleReschedule = (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = {};
    if (!bookingId) {
      newErrors.bookingId = 'Booking ID is required';
    }
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Make the PUT request
    axios
      .put(`http://localhost:3000/bookings/${bookingId}`, { startDate, endDate })
      .then((response) => {
        setMessage(response.data.message);
        // Reset form values and errors
        setBookingId('');
        setStartDate('');
        setEndDate('');
        setErrors({});
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
        {errors.bookingId && <span className="error">{errors.bookingId}</span>}
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && <span className="error">{errors.startDate}</span>}
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {errors.endDate && <span className="error">{errors.endDate}</span>}
      </div>

      <button type="submit">Reschedule</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RescheduleForm;
