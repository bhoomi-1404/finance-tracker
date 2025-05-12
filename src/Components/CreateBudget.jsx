import React, { useState } from "react";
import ReactModal from "react-modal";
import "../assets/general.css";
import "../assets/addTransaction.css";
import "../assets/createBudget.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ProgressLine from "./ProgressLine";
import {
  budgetCategories,
  getCategorizedBudgetSummaryForOverBudget,
  timeFrames,
} from "../Utils/GeneralUtils";
import { useExpenses } from "../Store/useExpenses";
const CreateBudget = ({ openCreateBudgetModal, setOpenCreateBudgetModal }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const addBudget = useExpenses((state) => state.addBudget);
  const expenses = useExpenses((state) => state.expenses);
  const budgets = useExpenses((state) => state.budgets);
  const getCategorizedBudgetSummary = getCategorizedBudgetSummaryForOverBudget(
    expenses,
    budgets
  );
  const handleAddBudget = () => {
    if (!selectedCategory || !selectedTimeframe || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const newBudget = {
      category: selectedCategory.value,
      total: parseFloat(amount),
      // spent: 0,
      timeframe: selectedTimeframe.label,
    };
    addBudget(newBudget);

    setSelectedCategory(null);
    setSelectedTimeframe(null);
    setAmount("");
    setError("");

    // Optionally close modal
    setOpenCreateBudgetModal(false);
  };
  return (
    <>
      <ReactModal
        isOpen={openCreateBudgetModal}
        onRequestClose={() => setOpenCreateBudgetModal(!openCreateBudgetModal)}
      >
        <div className="heading" style={{ color: "black" }}>
          Set Budget
        </div>
        <div className="text-sm" style={{ marginBottom: "1rem" }}>
          Create or update your spending budget to help manage your finances.
        </div>
        <div className="add-transaction-wrapper">
          {/* Category Dropdown */}
          <div className="input-wrapper">
            <div className="text-label">Category</div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="dropdown-trigger">
                  {selectedCategory
                    ? selectedCategory.label
                    : "Select category"}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="dropdown-content"
                  side="bottom"
                  align="start"
                >
                  {budgetCategories.map((cat) => (
                    <DropdownMenu.Item
                      key={cat.value}
                      className="dropdown-item"
                      onSelect={() => setSelectedCategory(cat)}
                    >
                      {cat.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>

          {/* Amount Input */}
          <div className="input-wrapper">
            <div className="text-label">Amount</div>
            <input
              className="input-field"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val)) setAmount(val);
              }}
            />
            {error && (
              <div className="error-message">Please enter a valid value</div>
            )}
          </div>

          {/* Timeframe Dropdown */}
          <div className="input-wrapper">
            <div className="text-label">Timeframe</div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="dropdown-trigger">
                  {selectedTimeframe
                    ? selectedTimeframe.label
                    : "Select timeframe"}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="dropdown-content"
                  side="bottom"
                  align="start"
                >
                  {timeFrames.map((time) => (
                    <DropdownMenu.Item
                      key={time.value}
                      className="dropdown-item"
                      onSelect={() => setSelectedTimeframe(time)}
                    >
                      {time.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
        <div className="progress-lines">
          {getCategorizedBudgetSummary.map((budget, index) => (
            <ProgressLine
              key={index}
              category={budget.category}
              spent={budget.spent}
              total={budget.total}
              spentColor={budget.color}
            />
          ))}
        </div>

        <div className="bottom-action-btn-wrapper">
          <button className="secondary-btn">Cancel</button>
          <button className="primary-btn" onClick={() => handleAddBudget()}>
            Add Budget
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default CreateBudget;
