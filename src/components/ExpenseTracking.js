import React, { useState, useEffect } from 'react';
import './ExpenseTracking.css';

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ amount: '0.00', category: '', date: '', note: '' });
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(null);

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId); // Set userId from localStorage
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchExpenses = async () => {
      const response = await fetch(`https://backend-u3oi.onrender.com/expense/${userId}`);
      const data = await response.json();

      // Ensure each expense has a unique id (from the backend)
      const expensesWithIds = data.map((expense) => ({
        ...expense,
        id: expense.id || `${expense._id}`, // Use the MongoDB _id if available
      }));

      setExpenses(expensesWithIds); // Update the state with unique IDs
    };

    fetchExpenses();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addExpense = async () => {
    if (!newExpense.amount || !newExpense.category || !newExpense.date) {
      alert('Please fill in all required fields before adding an expense.');
      return;
    }

    const expenseData = { ...newExpense, userId };
    console.log('Sending expense data:', expenseData);

    const response = await fetch(`https://backend-u3oi.onrender.com/expense/save/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([expenseData]),
    });

    const responseData = await response.json();
    console.log('Server response:', responseData);

    if (response.ok) {
      setExpenses((prevExpenses) => [...prevExpenses, responseData]); // Update the state with new expense
      setNewExpense({ amount: '0.00', category: '', date: '', note: '' });
      alert('Expense added successfully!');
      window.location.reload(); // Refresh the page after adding
    } else {
      alert(`Error adding expense: ${responseData.message || responseData.error || 'Unknown error'}`);
    }
  };

  const saveEditedExpense = async () => {
    if (!newExpense.amount || !newExpense.category || !newExpense.date) {
      alert('Please fill in all required fields before saving the expense.');
      return;
    }

    const updatedExpense = { ...newExpense, userId, id: editingId };
    console.log('Saving edited expense:', updatedExpense);

    const response = await fetch(`https://backend-u3oi.onrender.com/expense/user/${userId}/expenses/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpense),
    });

    const responseData = await response.json();
    console.log('Server response:', responseData);

    if (response.ok) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingId ? updatedExpense : expense // Update the correct expense
        )
      );
      setEditingId(null);
      setNewExpense({ amount: '0.00', category: '', date: '', note: '' });
      alert('Expense updated successfully!');
      window.location.reload(); // Refresh the page after updating
    } else {
      alert(`Error saving edited expense: ${responseData.message || responseData.error || 'Unknown error'}`);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewExpense({ amount: '0.00', category: '', date: '', note: '' });
  };

  const deleteExpense = async (id) => {
    const response = await fetch(`https://backend-u3oi.onrender.com/expense/user/${userId}/expenses/${id}`, {
      method: 'DELETE',
    });

    const responseData = await response.json();
    console.log('Server response on delete:', responseData);

    if (response.ok) {
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      alert('Expense deleted successfully!');
      window.location.reload(); // Refresh the page after deleting
    } else {
      alert(`Error deleting the expense: ${responseData.message || responseData.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="feature-page">
      <h1>Expense Tracking</h1>
      <p>Track and monitor your daily expenses effectively.</p>
      <div className="content-container">
        <div className="expense-form">
          <input
            type="text"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            placeholder="Amount (USD)"
          />
          <select name="category" value={newExpense.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="note"
            value={newExpense.note}
            onChange={handleInputChange}
            placeholder="Note (optional)"
          />
          <button onClick={editingId ? saveEditedExpense : addExpense}>
            {editingId ? 'Save Expense' : 'Add Expense'}
          </button>
          {editingId && <button onClick={cancelEditing}>Cancel</button>}
        </div>

        <div className="expense-list">
          <h2>Expenses</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount (USD)</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.category}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td>{expense.note}</td>
                    <td>
                      <button onClick={() => {
                        setNewExpense(expense);
                        setEditingId(expense.id); // Correctly set the editing ID
                      }}>
                        Edit
                      </button>
                      <button onClick={() => deleteExpense(expense.id)}>Delete</button>
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

export default ExpenseTracking;
