import React, { useState } from "react";
import ReactModal from "react-modal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { goalOptions, goalColors } from "../Utils/GeneralUtils";
import "../assets/general.css";
import { useExpenses } from "../Store/useExpenses";
import "../assets/addGoal.css";
const CreateNewGoal = ({ openCreateGoalModal, setOpenCreateGoalModal }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const addNewGoal = useExpenses((state) => state.addGoal);
  const [addGoal, setAddGoal] = useState({
    name: "",
    amount: "",
    category: "",
    deadline: "",
  });
  const handleOnCancel = () => {
    setOpenCreateGoalModal(false);
  };
  const handleAddGoal = () => {
    if (
      !addGoal.name ||
      !addGoal.amount ||
      !selectedGoal ||
      !addGoal.deadline
    ) {
      alert("Please fill all required fields");
      return;
    }
    const newGoal = {
      amount: 0,
      category: selectedGoal.value,
      name: addGoal.name,
      deadline: addGoal.deadline,
      id: Date.now(),
      target: parseFloat(addGoal.amount),
      color: goalColors[Math.floor(Math.random() * goalColors.length)],
    };

    addNewGoal(newGoal);
    setAddGoal({ ...addGoal, name: "", amount: "", deadline: "" });
    setOpenCreateGoalModal(false);
  };
  return (
    <div>
      <ReactModal
        isOpen={openCreateGoalModal}
        onRequestClose={() => setOpenCreateGoalModal(!openCreateGoalModal)}
      >
        <div className="heading">
          Create New Savings Goal
        </div>
        <div className="text-sm">
          Set a new financial goal to track your progress
        </div>

        <div className="add-transaction-wrapper">
          <div className="input-wrapper">
            <div className="text-label"> Name</div>
            <input
              className="input-field"
              type="text"
              placeholder="ex. Emergency Fund"
              value={addGoal.name}
              onChange={(e) => setAddGoal({ ...addGoal, name: e.target.value })}
            />
          </div>
          <div className="input-wrapper">
            <div className="text-label"> Target Amount</div>
            <input
              className="input-field"
              type="text"
              placeholder="Enter amount"
              value={addGoal.amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val))
                  setAddGoal({ ...addGoal, amount: val });
              }}
            />
          </div>
          <div className="input-wrapper">
            <div className="text-label"> Category</div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="dropdown-trigger">
                  {selectedGoal ? selectedGoal.label : "Select goal category"}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="dropdown-content"
                  side="bottom"
                  align="start"
                >
                  {goalOptions.map((cat) => (
                    <DropdownMenu.Item
                      key={cat.value}
                      className="dropdown-item"
                      onSelect={() => setSelectedGoal(cat)}
                    >
                      {cat.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          <div className="input-wrapper">
            <div className="text-label"> Deadline</div>
            <input
              className="input-field"
              type="date"
              value={addGoal.deadline}
              onChange={(e) =>
                setAddGoal({ ...addGoal, deadline: e.target.value })
              }
            />
          </div>
        </div>
        <div className="bottom-action-btn-wrapper" style={{ top: "0px" }}>
          <button className="secondary-btn" onClick={() => handleOnCancel()}>
            Cancel
          </button>
          <button className="primary-btn" onClick={() => handleAddGoal()}>
            Add Goal
          </button>
        </div>
      </ReactModal>
    </div>
  );
};
export default CreateNewGoal;
