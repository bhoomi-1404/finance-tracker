import React, { useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiBars3 } from "react-icons/hi2";
import "../assets/topBar.css";
import "../assets/general.css";
import { useUIStore } from "../Store/useExpenses";
import AddTransaction from "./AddTransaction";
import { useTheme } from "../Store/ThemeContext";
import { LuMoon } from "react-icons/lu";
const TopBar = () => {
  const { togglePanel } = useUIStore();
  const { theme, toggleTheme } = useTheme();

  const [isAddTrasanctionModalOpen, setIsAddTrasanctionModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("Expense");
  return (
    <div>
      <div className="top-bar-container">
        <div className="left-part">
          <button className="menu-bar" onClick={togglePanel}>
            <HiBars3 />
          </button>
          <div className="logo">ExpenseTracker</div>
        </div>

        <div className="right-part-bar">
          <button
            className="button-box"
            onClick={() => toggleTheme()}
            title="Toggle theme"
          >
            {theme === "light" ? <LuMoon /> : <MdOutlineLightMode />}
          </button>

          <div className="primary-btn">
            <HiOutlinePlusSm />
            <button
              className="primary-btn"
              onClick={() =>
                setIsAddTrasanctionModalOpen(!isAddTrasanctionModalOpen)
              }
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
      <div className="horizontal-line" />

      <AddTransaction
        setIsAddTrasanctionModalOpen={setIsAddTrasanctionModalOpen}
        isAddTrasanctionModalOpen={isAddTrasanctionModalOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
export default TopBar;
