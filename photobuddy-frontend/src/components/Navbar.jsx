import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo" href="">PhotoBuddy</div>
      <div className="nav-links">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;