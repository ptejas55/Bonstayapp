import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    numOfPersons: '',
    roomType: ''
  });

  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
    numOfPersons: '',
    roomType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = {};
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (!formData.numOfPersons) {
      newErrors.numOfPersons = 'Number of persons is required';
    }
    if (!formData.roomType) {
      newErrors.roomType = 'Room type is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the form
    axios
      .post('http://localhost:3000/bookings', formData)
      .then((response) => {
        console.log('Booking success!', response.data);
        // Reset form data
        setFormData({
          startDate: '',
          endDate: '',
          numOfPersons: '',
          roomType: ''
        });
        setErrors({
          startDate: '',
          endDate: '',
          numOfPersons: '',
          roomType: ''
        });
      })
      .catch((error) => {
        console.error('Booking failed!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        {errors.startDate && <span className="error">{errors.startDate}</span>}
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
        {errors.endDate && <span className="error">{errors.endDate}</span>}
      </div>

      <div>
        <label>Number of Persons:</label>
        <input
          type="number"
          name="numOfPersons"
          value={formData.numOfPersons}
          onChange={handleChange}
        />
        {errors.numOfPersons && <span className="error">{errors.numOfPersons}</span>}
      </div>

      <div>
        <label>Room Type:</label>
        <select name="roomType" value={formData.roomType} onChange={handleChange}>
          <option value="">Select Room Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
        {errors.roomType && <span className="error">{errors.roomType}</span>}
      </div>

      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
