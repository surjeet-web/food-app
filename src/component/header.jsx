import React from "react";
import logo from "../assets/logo.jpg"; // Adjust the path based on your folder structure
import "../App.css"; // Import global styles
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Services</a>
        <a href="#" className="nav-link">Contact</a>
      </nav>
      <button className="cta-button">Get Started</button>
    </header>
  );
};

export default Header;
