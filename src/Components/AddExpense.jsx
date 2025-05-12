import React, { useEffect, useState } from "react";
import "../assets/general.css";
import "../assets/addTransaction.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { categories, paymentMethods } from "../Utils/GeneralUtils";
import { useExpenses } from "../Store/useExpenses";
const AddExpense = ({ setIsAddTrasanctionModalOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const addExpense = useExpenses((state) => state.addExpense);
  const editingTxn = useExpenses((state) => state.editingTransaction);
  console.log("🚀 ~ AddExpense ~ addExpense:", addExpense);
  const expenses = useExpenses((state) => state.expenses);
  const editExpense = useExpenses((state) => state.editExpense);
  console.log("🚀 ~ AddExpense ~ expenses:", expenses);

  const handleAddExpense = () => {
    if (!amount || !selectedCategory || !date || !selectedPaymentMethod) {
      alert("Please fill all required fields");

      return;
    }
    const updatedExpense = {
      amount: parseFloat(amount),
      category: selectedCategory.value,
      date,
      paymentMethod: selectedPaymentMethod.value,
      description,
      expenseType: "Expense",
    };

    if (editingTxn && editingTxn.expenseType === "Expense") {
      editExpense(editingTxn.id, updatedExpense);
    } else {
      const newExpense = {
        id: Date.now(),
        ...updatedExpense,
      };
      addExpense(newExpense);
    }
    useExpenses.getState().clearEditingTransaction();
    setAmount("");
    setSelectedCategory(null);
    setDate("");
    setSelectedPaymentMethod(null);
    setDescription("");
    setIsAddTrasanctionModalOpen(false);
  };
  useEffect(() => {
    if (editingTxn && editingTxn.expenseType === "Expense") {
      console.log("🚀 ~ useEffect ~ editingTxn:", editingTxn);

      setAmount(editingTxn.amount);
      setDate(editingTxn.date);
      setSelectedCategory(
        categories?.find((cat) => cat?.value === editingTxn.category)
      );
      setSelectedPaymentMethod(
        paymentMethods?.find(
          (method) => method?.label === editingTxn.paymentMethod
        )
      );
      setDescription(editingTxn.description || "");
    }
  }, [editingTxn]);

  const handleOnCancel = () => {
    setAmount("");
    setSelectedCategory(null);
    setDate("");
    setSelectedPaymentMethod(null);
    setDescription("");
    setIsAddTrasanctionModalOpen(false);
  };
  return (
    <div className="add-transaction-wrapper">
      <div className="input-wrapper ">
        <div className="text-label ">Amount</div>
        <div>
          <input
            className="input-field"
            placeholder="0.0"
            type="value"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) setAmount(val);
            }}
          />
        </div>
      </div>

      <div className="input-wrapper ">
        <div className="text-label ">Category</div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="dropdown-trigger">
              {selectedCategory ? selectedCategory.label : "Select category"}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="dropdown-content"
              side="bottom"
              align="start"
            >
              {categories.map((cat) => (
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

      <div className="input-wrapper ">
        <div className="text-label ">Date</div>
        <div>
          <input
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="input-wrapper ">
        <div className="text-label "> Payment Method</div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="dropdown-trigger">
              {selectedPaymentMethod
                ? selectedPaymentMethod.label
                : "Select payement method"}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="dropdown-content"
              side="bottom"
              align="start"
            >
              {paymentMethods.map((cat) => (
                <DropdownMenu.Item
                  key={cat.value}
                  className="dropdown-item"
                  onSelect={() => setSelectedPaymentMethod(cat)}
                >
                  {cat.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="input-wrapper ">
        <div className="text-label ">Desciption</div>
        <textarea
          className="input-field"
          value={description}
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="bottom-action-btn-wrapper">
        <button className="secondary-btn" onClick={() => handleOnCancel()}>
          Cancel
        </button>
        <button className="primary-btn" onClick={() => handleAddExpense()}>
          Add Expense
        </button>
      </div>
    </div>
  );
};
export default AddExpense;
