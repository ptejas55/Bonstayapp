import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (name.length < 3) {
      setErrorMessage('Name must be at least 3 characters long.');
    } else if (address.length < 5) {
      setErrorMessage('Address must be at least 5 characters long.');
    } else if (phone.length !== 10) {
      setErrorMessage('Phone number must be 10 digits long.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
    } else if (!email.includes('@')) {
      setErrorMessage('Invalid email address.');
    } else {
      // Make API call to register user
      axios
        .post('/users', { name, address, phone, password, email })
        .then((response) => {
          const data = response.data;
          if (data.error) {
            setErrorMessage(data.error);
          } else {
            setSuccessMessage('Registration successful!');
            // Reset form
            setName('');
            setAddress('');
            setPhone('');
            setPassword('');
            setEmail('');
          }
        })
        .catch((error) => {
          setErrorMessage('An error occurred while registering. Please try again later.');
        });
    }
  };

  const handleLogin = () => {
    // Make API call to check login credentials
    axios
      .post('/users/login', { email, password })
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setSuccessMessage('Login successful!');
          // Redirect to home page or perform any other desired action
          history.push('/home');
        }
      })
      .catch((error) => {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Registration Form</h1>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleFormSubmit}>
        {/* Form fields */}
        {/* ... */}
        <button type="submit">Register</button>
      </form>
      <div>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default RegistrationForm;
