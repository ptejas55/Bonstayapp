import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li className="nav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/hotels">Hotels</Link>
        </li>
        <li className="nav-item">
          <Link to="/booking">Booking</Link>
        </li>
        <li className="nav-item">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
