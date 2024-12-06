// src/components/MainFeatures.js
import React from 'react';
import './MainFeatures.css';

function MainFeatures() {
  return (
    <div className="features-container">
      <div className="feature-box" onClick={() => alert("Expense Tracking clicked!")}>
        <h3>Expense Tsdkfjnsjdfndjsracking</h3>
        <p>Easily add, edit, and categorize your expenses.</p>
      </div>
      <div className="feature-box" onClick={() => alert("Budget Planning clicked!")}>
        <h3>Budget Planning</h3>
        <p>Set budgets and monitor your spending trends.</p>
      </div>
      <div className="feature-box" onClick={() => alert("Data Visualization clicked!")}>
        <h3>Data Visualization</h3>
        <p>Analyze spending patterns with interactive charts.</p>
      </div>
    </div>
  );
}

export default MainFeatures;
