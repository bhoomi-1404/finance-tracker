import React from "react";
import "../assets/progressLine.css"; // Adjust the path as necessary

const ProgressLine = ({
  category,
  spent,
  total,
  spentColor,
  remainingColor = "#e2e8f0",
}) => {
  console.log("🚀 ~ spentColor:", spentColor);

  const percentage = Math.min((spent / total) * 100, 100);
  const remaining = total - spent;

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        {category && <span className="category-name">{category?.split("_")?.join(" ")}</span>}

        <span className="amount-spent">
          ₹{spent.toFixed(2)} / ₹{total.toFixed(2)}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-spent"
          style={{
            width: `${percentage}%`,
            backgroundColor: spentColor,
          }}
        />
        <div
          className="progress-remaining"
          style={{
            width: `${100 - percentage}%`,
            backgroundColor: remainingColor,
          }}
        />
      </div>

      <div className="progress-footer">
        {remaining && (
          <span className="remaining-amount">
            Remaining: ₹{remaining.toFixed(2)}
          </span>
        )}

        <span className="percent-used">{Math.round(percentage)}% used</span>
      </div>
    </div>
  );
};

export default ProgressLine;
