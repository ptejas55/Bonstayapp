import React, { useState } from 'react';
import axios from 'axios';

const AddReviewForm = () => {
  const [hotelId, setHotelId] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  const handleAddReview = () => {
    // Make the PATCH request
    axios
      .patch(`/hotels/${hotelId}`, { review })
      .then((response) => {
        setMessage(response.data.message);
        setHotelId('');
        setReview('');
      })
      .catch((error) => {
        console.error('Failed to add review!', error);
      });
  };

  return (
    <div>
      <label>Hotel ID:</label>
      <input
        type="text"
        value={hotelId}
        onChange={(e) => setHotelId(e.target.value)}
      />

      <label>Review:</label>
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button type="button" onClick={handleAddReview}>
        Add Review
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddReviewForm;
