import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import myImage from './planmate logo.png'; // Adjust the path to match your file location
import QuestionsPage from './QuestionsPage'; // Import the new QuestionsPage component

import ResultsPage from './ResultsPage'; // Import the new ResultsPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/results" element={<ResultsPage />} /> {/* Add ResultsPage */}
      </Routes>
    </Router>
  );
}


function HomePage() {
  return (
    <div className="container">
      <img src={myImage} alt="PlanMate Logo" />
      <div className="text">YOUR PERFECT OUTING SIMPLIFIED!</div>
      <button className="get-started-btn" onClick={() => window.location.href = '/questions'}>
        Get Started
      </button>
    </div>
  );
}

export default App;
