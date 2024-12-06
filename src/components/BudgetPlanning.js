import React, { useState, useEffect } from 'react';
import './BudgetPlanning.css';

const BudgetPlanning = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '0.00' });
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(null);

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'];

  // Fetch user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId);
    }
  }, []);

  // Fetch budgets for the user
  useEffect(() => {
    if (!userId) return;

    const fetchBudgets = async () => {
      try {
        const response = await fetch(`https://backend-u3oi.onrender.com/budget/${userId}`);
        const data = await response.json();
        setBudgets(data.map((budget) => ({ ...budget, id: budget.id || `${budget._id}` })));
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a new budget
  const addBudget = async () => {
    if (!newBudget.amount || newBudget.amount === '0.00' || isNaN(newBudget.amount) || !newBudget.category) {
      alert('Please fill in all required fields.');
      return;
    }

    const budgetData = [{ ...newBudget, userId }];  // Wrap the newBudget in an array
    try {
      const response = await fetch(`https://backend-u3oi.onrender.com/budget/save/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(budgetData), // Send as an array
      });
      const responseData = await response.json();

      if (response.ok) {
        setBudgets((prevBudgets) => [...prevBudgets, ...responseData]);
        setNewBudget({ category: '', amount: '0.00' });
        alert('Budget added successfully!');
      } else {
        alert(`Error adding budget: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  // Save edited budget
  const saveEditedBudget = async () => {
    if (!newBudget.amount || newBudget.amount === '0.00' || isNaN(newBudget.amount) || !newBudget.category) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedBudget = { ...newBudget, userId, id: editingId };
    try {
      const response = await fetch(`https://backend-u3oi.onrender.com/budget/user/${userId}/budgets/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBudget),
      });

      const responseData = await response.text();  // Get plain response text
      console.log(responseData);  // Check what is returned

      if (response.ok) {
        setBudgets((prevBudgets) =>
          prevBudgets.map((budget) => (budget.id === editingId ? updatedBudget : budget))
        );
        setEditingId(null);
        setNewBudget({ category: '', amount: '0.00' });
        alert('Budget updated successfully!');
      } else {
        alert(`Error saving budget: ${responseData || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setNewBudget({ category: '', amount: '0.00' });
  };

  // Delete a budget
  const deleteBudget = async (id) => {
    try {
      const response = await fetch(`https://backend-u3oi.onrender.com/budget/user/${userId}/budgets/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
        alert('Budget deleted successfully!');
      } else {
        const responseData = await response.json();
        alert(`Error deleting budget: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <div className="feature-page">
      <h1>Budget Planning</h1>
      <p>Plan your budget effectively to manage your finances better.</p>
      <div className="content-container">
        <div className="budget-form">
          <select name="category" value={newBudget.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="amount"
            value={newBudget.amount}
            onChange={handleInputChange}
            placeholder="Budget Amount (USD)"
          />
          <button onClick={editingId ? saveEditedBudget : addBudget}>
            {editingId ? 'Save' : 'Add Budget'}
          </button>
          {editingId && <button onClick={cancelEditing}>Cancel</button>}
        </div>

        <div className="budget-list">
          <h2>Budget List</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget Amount (USD)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => (
                  <tr key={budget.id}>
                    <td>{budget.category}</td>
                    <td>${parseFloat(budget.amount).toFixed(2)}</td>
                    <td>
                      <button onClick={() => {
                        setNewBudget(budget);
                        setEditingId(budget.id);
                      }}>
                        Edit
                      </button>
                      <button onClick={() => deleteBudget(budget.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanning;
