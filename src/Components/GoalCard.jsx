import React from "react";
import "../assets/goalCard.css";
import { useExpenses } from "../Store/useExpenses";
import { HiArrowTrendingUp } from "react-icons/hi2";
const GoalCard = ({ goalId }) => {
  const goal = useExpenses((state) => state.goals.find((g) => g.id === goalId));
  const updateGoalAmount = useExpenses((state) => state.updateGoalAmount);
  if (!goal) return null;
  const { id, amount, name, target, color } = goal;
  const percentage = Math.min(100, Math.round((amount / target) * 100));

  const remaining = target - amount;
  const handleAddAmount = () => {
    const newAmount = amount + 1000;
    if (newAmount > target) {
      alert("You have already reached your goal!");
      return;
    }
    console.log("id", id);
    updateGoalAmount(id, 1000);
  };

  return (
    <div className="goal-card">
      <div className="goal-top">
        <span className="goal-name">{name}</span>
        <span className="goal-amount">
          ₹{amount.toLocaleString()} / ₹{target.toLocaleString()}
        </span>
      </div>

      <div className="goal-progress-bar">
        <div
          className="goal-progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>

      <div className="goal-bottom">
        <span className="goal-remaining">
          ₹{remaining.toLocaleString()} to go
        </span>
        <div className="goal-action">
          <span>{percentage}%</span>
          <button
            className="goal-add-btn"
            onClick={handleAddAmount}
            disabled={amount >= target}
          >
            <HiArrowTrendingUp />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
