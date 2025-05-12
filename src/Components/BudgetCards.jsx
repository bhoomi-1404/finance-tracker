import React from "react";
import "../assets/budgetCards.css";
import { useExpenses } from "../Store/useExpenses";
const BudgetCards = () => {
  const budgets = useExpenses((state) => state.budgets);
  const expenses = useExpenses((state) => state.expenses);
  const overAllBudget = budgets?.find(
    (budget) => budget.category === "Overall_Budget"
  );
  const totalSpent = expenses
    .filter((expense) =>
      budgets.some(
        (budget) =>
          budget.category !== "Overall Budget" &&
          budget.category === expense.category
      )
    )
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalBudget = budgets.find((b) => b.category === "Overall_Budget");
  console.log("🚀 ~ BudgetCards ~ totalBudget:", totalBudget)


  const remaining = totalBudget?.total - totalSpent;
  const percentUsed = (totalSpent / totalBudget?.total) * 100;

  return (
    <div className="budget-cards-container">
      <div className="card">
        <div className="card-header">Total Budget</div>
        <div className="amount-spent">₹{overAllBudget?.total}</div>
        <div className="subtext">Monthly allocation</div>
      </div>

      <div className="card">
        <div className="card-header">Total Spent</div>
        <div className="amount-spent">₹{totalSpent}</div>
        <div className="progress-bar">
          <div
            className="progress-filled"
            style={{ width: `${percentUsed.toFixed()}%` }}
          ></div>
        </div>
        <div className="subtext">{percentUsed.toFixed(2)}% of budget used</div>
      </div>

      <div className="card">
        <div className="card-header">Remaining</div>
        <div className="amount-spent">₹{remaining}</div>
        <div className="subtext">Available to spend</div>
      </div>
    </div>
  );
};

export default BudgetCards;
