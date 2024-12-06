// src/components/Features.js
import React from 'react';
import './Feature.css';
import { FaWallet, FaChartLine, FaClipboardList } from 'react-icons/fa'; // Importing icons for the features

function Features() {
  return (
    <div className="features">
      <div className="intro-box shake">
        <h1>What Our Application Offers</h1>
        <p className="intro">
          Take control of your finances with powerful tools designed to help you track, plan, and visualize your spending. Explore our core features below:
        </p>
      </div>
      
      <div className="feature-container shake">
        <div className="feature">
          <div className="icon">
            <FaWallet />
          </div>
          <h2>Expense Tracking</h2>
          <p>Easily add, edit, and categorize your expenses to keep track of where your money goes.</p>
        </div>

        <div className="feature">
          <div className="icon">
            <FaClipboardList />
          </div>
          <h2>Budget Planning</h2>
          <p>Set budgets for different categories and monitor your spending trends over time.</p>
        </div>

        <div className="feature">
          <div className="icon">
            <FaChartLine />
          </div>
          <h2>Data Visualization</h2>
          <p>Analyze your spending patterns with interactive charts and graphs to make better decisions.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
