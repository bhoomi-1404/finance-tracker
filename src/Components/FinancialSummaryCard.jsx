import React from "react";
import "../assets/financialSummary.css";

const FinancialSummaryCard = ({
  title,
  amount,
  change,
  changeType,
  icon,
  extra,
  progress,
}) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <span>{title}</span>
        {icon && <span>{icon}</span>}
      </div>

      <div className="card-amount">₹ {amount}</div>

      {change !== undefined && (
        <div
          className={`card-change ${changeType === "increase" ? "text-increase" : "text-decrease"}`}
        ></div>
      )}

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

export default FinancialSummaryCard;
