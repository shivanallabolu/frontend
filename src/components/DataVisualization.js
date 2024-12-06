import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './DataVisualization.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DataVisualization = () => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [userId, setUserId] = useState(null);

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'];

  // Fetch user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
      setUserId(user.userId); // Set userId from localStorage
    }
  }, []);

  // Fetch budgets and expenses for the user
  useEffect(() => {
    if (!userId) return;

    const fetchBudgetsAndExpenses = async () => {
      try {
        const budgetResponse = await fetch(`http://localhost:999/budget/${userId}`);
        const budgetData = await budgetResponse.json();
        setBudgets(budgetData.map((budget) => ({ ...budget, id: budget.id || `${budget._id}` })));

        const expenseResponse = await fetch(`http://localhost:999/expense/${userId}`);
        const expenseData = await expenseResponse.json();
        setExpenses(expenseData.map((expense) => ({ ...expense, id: expense.id || `${expense._id}` })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBudgetsAndExpenses();
  }, [userId]);

  // Prepare the data for the bar chart
  const getChartData = () => {
    const budgetData = categories.map((category) => {
      const budget = budgets.find((b) => b.category === category);
      return budget ? parseFloat(budget.amount) : 0;
    });

    const expenseData = categories.map((category) => {
      const expense = expenses.filter((e) => e.category === category);
      return expense.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    });

    return {
      labels: categories,
      datasets: [
        {
          label: 'Budget Amount',
          data: budgetData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: expenseData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = getChartData();

  return (
    <div className="feature-page">
      <h1>Data Visualization</h1>
      {/* <p>Analyze your spending with interactive charts and graphs.</p> */}
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Budget vs. Expense Comparison',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DataVisualization;
