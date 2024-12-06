import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('user'); // Check if logged in

  return (
    <div className="home">
      <h1>Welcome to Budget Manager</h1>
      {/* <p>Your ultimate solution for financial tracking and planning.</p> */}

      <section className="features1">
        <div className="feature-item">
          <h2>Expense Tracking</h2>
          <p>Monitor your daily expenses with ease</p>
          {isAuthenticated ? (
            <Link to="/budget-tracking">
              <button>Explore</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button>Sign In to Access</button>
            </Link>
          )}
        </div>
        <div className="feature-item">
          <h2>Budget Planning</h2>
          <p>Plan your financial goals effectively</p>
          {isAuthenticated ? (
            <Link to="/budget-planning">
              <button>Explore</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button>Sign In to Access</button>
            </Link>
          )}
        </div>
        <div className="feature-item">
          <h2>Data Visualization</h2>
          <p>Analyze data with charts</p>
          {isAuthenticated ? (
            <Link to="/data-visualization">
              <button>Explore</button>
            </Link>
          ) : (
            <Link to="/signin">
              <button>Sign In to Access</button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;