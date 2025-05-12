import React from "react";
import ProgressLine from "./ProgressLine";
import "../assets/general.css";
import { useExpenses } from "../Store/useExpenses";
import GoalCard from "../Components/GoalCard";
import "../assets/goalCard.css";
const SavingGoal = () => {
  const goals = useExpenses((state) => state.goals);
  console.log("🚀 ~ SavingGoal ~ goals:", goals);

  return (
    <div className="progress-lines">
      <div className="heading">Savings Goals</div>
      <div className="text-sm" style={{ marginBottom: "1.5rem" }}>
        Track progress towards your financial goals
      </div>
      <div className="goals-grid">
        {goals.map((goal) => (
          <GoalCard key={goal.name} goalId={goal.id} />
        ))}
      </div>
    </div>
  );
};
export default SavingGoal;
