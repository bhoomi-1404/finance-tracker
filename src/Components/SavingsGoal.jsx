import React from "react";
import "../assets/financialSummary.css";
import "../assets/general.css";
import "../assets/charts.css";
const SavingsGoal = () => {
  const progress = 65;
  const extra = "You're halfway to your goal! Keep it up.";
  return (
    <div className="charts-container">
      <div className="heading" >
        Savings Goal
      </div>
      <div className="text-sm">Progress towards your savings target</div>
      {progress !== undefined && (
        <>
          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <small>{extra}</small>
        </>
      )}
    </div>
  );
};
export default SavingsGoal;
