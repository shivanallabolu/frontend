import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global CSS
import App from './App';  // Main app component
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Mount point for React
root.render(
  <React.StrictMode>
    <App />  {/* Your app gets rendered here */}
  </React.StrictMode>
);

// Web vitals reporting (optional, for performance measurement)
reportWebVitals();
