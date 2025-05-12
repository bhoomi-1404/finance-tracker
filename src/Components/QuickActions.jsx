import React, { useState } from "react";
import "../assets/charts.css";
import "../assets/general.css";
import { LuWallet } from "react-icons/lu";
import { FiArrowUpRight, FiPieChart } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import AddTransaction from "./AddTransaction";
import CreateBudget from "./CreateBudget";
import { useNavigate } from "react-router-dom";
const QuickActions = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isAddTrasanctionModalOpen, setIsAddTrasanctionModalOpen] =
    useState(false);
  const [openCreateBudgetModal, setOpenCreateBudgetModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Expense");
  const navigate = useNavigate();
  const handleClick = (index, action) => {
    console.log("🚀 ~ handleClick ~ index:", index, action);
    if (action.label === "Add Expense") {
      setActiveTab("Expense");
      setIsAddTrasanctionModalOpen(true);
    }
    if (action.label === "Add Income") {
      setActiveTab("Income");
      setIsAddTrasanctionModalOpen(true);
    }
    if (action.label === "Set Budget") {
      setOpenCreateBudgetModal(true);
    }
    if (action.label === "View Reports") {
      navigate("/reports");
    }
    setActiveButton(index);
  };
  return (
    <div>
      {" "}
      <div className="charts-container">
        <div className="heading">Quick Action</div>
        <div className="text-sm">Common tasks and shortcuts</div>

        <div className="action-button-wrapper">
          {[
            { icon: <LuWallet />, label: "Add Expense" },
            { icon: <FiArrowUpRight />, label: "Add Income" },
            { icon: <FiPieChart />, label: "Set Budget" },
            { icon: <GoGraph />, label: "View Reports" },
          ].map((action, index) => (
            <button
              key={index}
              className={`action-btn ${activeButton === index ? "active" : ""}`}
              onClick={() => handleClick(index, action)}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
      <AddTransaction
        isAddTrasanctionModalOpen={isAddTrasanctionModalOpen}
        setIsAddTrasanctionModalOpen={setIsAddTrasanctionModalOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <CreateBudget
        openCreateBudgetModal={openCreateBudgetModal}
        setOpenCreateBudgetModal={setOpenCreateBudgetModal}
      />
    </div>
  );
};
export default QuickActions;
