import React, { useState } from "react";
import { useExpenses } from "../Store/useExpenses";
import { incomeCategories } from "../Utils/GeneralUtils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
const AddNewIncome = ({ setIsAddTrasanctionModalOpen }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const addIncome = useExpenses((state) => state.addIncome);

  const handleAddIncome = () => {
    if (!amount || !category || !date) {
      alert("Please fill all required fields");

      return;
    }

    const newIncome = {
      id: Date.now(),
      amount: parseFloat(amount),
      category: category.value,
      date,
      description,
      expenseType: "Income",
    };
    console.log("🚀 ~ handleAddIncome ~ newIncome:", newIncome);
    addIncome(newIncome);

    // Reset form
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setIsAddTrasanctionModalOpen(false);
  };
  const handleOnCancel = () => {
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setIsAddTrasanctionModalOpen(false);
  };

  return (
    <div className="add-transaction-wrapper">
      <div className="input-wrapper ">
        <div className="text-label">Amount</div>
        <input
          className="input-field"
          placeholder="0.0"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*\.?\d*$/.test(val)) setAmount(val); // allow only numbers
          }}
        />
      </div>

      <div className="input-wrapper ">
        <div className="text-label">Category</div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="dropdown-trigger">
              {category ? category.label : "Select income type"}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="dropdown-content"
              side="bottom"
              align="start"
            >
              {incomeCategories.map((cat) => (
                <DropdownMenu.Item
                  key={cat.value}
                  className="dropdown-item"
                  onSelect={() => setCategory(cat)}
                >
                  {cat.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="input-wrapper ">
        <div className="text-label">Date</div>
        <input
          className="input-field"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="input-wrapper ">
        <div className="text-label">Description</div>
        <textarea
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="bottom-action-btn-wrapper">
        <button className="secondary-btn" onClick={() => handleOnCancel()}>
          Cancel
        </button>
        <button className="primary-btn" onClick={handleAddIncome}>
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddNewIncome;
