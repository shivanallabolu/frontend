import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Features from './components/Feature';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import BudgetTracking from './components/ExpenseTracking';
import BudgetPlanning from './components/BudgetPlanning';
import DataVisualization from './components/DataVisualization';
import MyAccount from './components/MyAccount'; // Make sure you have this component
import ProtectedRoute from './components/ProtectedRoute'; // Keep the ProtectedRoute logic intact
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/myaccount"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget-tracking"
          element={
            <ProtectedRoute>
              <BudgetTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget-planning"
          element={
            <ProtectedRoute>
              <BudgetPlanning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-visualization"
          element={
            <ProtectedRoute>
              <DataVisualization />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
