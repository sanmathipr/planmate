import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './App.css';
import myImage from './planmate logo.png';

function HomePage() {
  return (
    <div className="container">
      <img src={myImage} alt="PlanMate Logo" />
      <div className="text">YOUR PERFECT OUTING SIMPLIFIED!</div>
      <Link to="/questions">
        <button className="get-started-btn">
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
