import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionsPage() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event, questionId) => {
    setAnswers({ ...answers, [questionId]: event.target.value });
  };

  const handleSubmit = () => {
    // Pass answers to ResultsPage, including location (answers.q3)
    navigate('/results', { state: { answers } });
  };

  return (
    <div className="questions-container">
      <div className="questions-section">
        {/* Question 1 */}
        <div className="question-input-pair">
          <div className="question">Is this a date, or a hangout with friends?</div>
          <div className="radio-group vertical">
            <label>
              <input
                type="radio"
                name="q1"
                value="Date"
                checked={answers.q1 === "Date"}
                onChange={(e) => handleInputChange(e, 'q1')}
              />
              Date  
            </label>
            <label>
              <input
                type="radio"
                name="q1"
                value="Friends"
                checked={answers.q1 === "Friends"}
                onChange={(e) => handleInputChange(e, 'q1')}
              />
              Friends
            </label>
          </div>
        </div>

        {/* Question 2 */}
        <div className="question-input-pair">
          <div className="question">What is your budget?</div>
          <select
            id="q2"
            className="dropdown"
            value={answers.q2 || ''}
            onChange={(e) => handleInputChange(e, 'q2')}
          >
            <option value="" disabled>Select your budget</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>
        </div>

        {/* Question 3 (Location) */}
        <div className="question-input-pair">
          <div className="question">Where is your planned location?</div>
          <input
            type="text"
            id="q3"
            placeholder="Enter your answer"
            value={answers.q3 || ''}
            onChange={(e) => handleInputChange(e, 'q3')}
          />
        </div>

        {/* Question 4 */}
        <div className="question-input-pair">
          <div className="question">How long are you planning on going out?</div>
          <select
            id="q4"
            className="dropdown"
            value={answers.q4 || ''}
            onChange={(e) => handleInputChange(e, 'q4')}
          >
            <option value="" disabled>Select duration</option>
            <option value="1">30 min</option>
            <option value="2">1 hour</option>
            <option value="4">2 hours</option>
            <option value="8">3 hours</option>
            <option value="8">More than 4 hours</option>
          </select>
        </div>

        {/* Question 5 */}
        <div className="question-input-pair">
          <div className="question">What are your interests?</div>
          <input
            type="text"
            id="q5"
            placeholder="Enter your answer"
            value={answers.q5 || ''}
            onChange={(e) => handleInputChange(e, 'q5')}
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuestionsPage;
