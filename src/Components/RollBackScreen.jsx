import React, { useState } from "react";
import "../assets/rollBackScreen.css";
import { LuWallet } from "react-icons/lu";
import { IoPieChartOutline } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import AddTransaction from "./AddTransaction";
const RollBackScreen = () => {
  const [isAddTrasanctionModalOpen, setIsAddTrasanctionModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("Expense");
  return (
    <div class="rollback-container">
      <div class="rollback-header">
        <h1>Welcome to Your Financial Dashboard</h1>
        <p>
          Track your expenses, set budgets, and manage your bills all in one
          place.
        </p>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <div class="icon-container">
            <LuWallet />
          </div>
          <h3>Track Expenses</h3>
          <div className="sub-text">Monitor where your money goes</div>
        </div>

        <div class="feature-card">
          <div class="icon-container">
            <IoPieChartOutline />
          </div>
          <h3>Set Budgets</h3>
          <div className="sub-text">Plan and control your spending</div>
        </div>

        <div class="feature-card">
          <div class="icon-container">
            <LuGoal />
          </div>
          <h3>Manage Goals</h3>
          <div className="sub-text">Create your saving goals</div>
        </div>
      </div>

      <div class="action-buttons">
        <button
          class="primary-btn"
          onClick={() => {
            setIsAddTrasanctionModalOpen(!isAddTrasanctionModalOpen);
          }}
        >
          <span class="plus-icon">+</span> Add Your First Transaction
        </button>
      </div>
      <AddTransaction
        setIsAddTrasanctionModalOpen={setIsAddTrasanctionModalOpen}
        isAddTrasanctionModalOpen={isAddTrasanctionModalOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
export default RollBackScreen;
