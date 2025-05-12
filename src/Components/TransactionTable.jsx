import React, { useEffect, useState } from "react";
import "../assets/transactionTable.css";
import { GoArrowDownRight } from "react-icons/go";
import { RiArrowLeftUpLine } from "react-icons/ri";
import "../assets/general.css";
import "../assets/createBudget.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useExpenses } from "../Store/useExpenses";
import AddTransaction from "./AddTransaction";

const TransactionsTable = ({ transactionList, setTransactionList }) => {
  const deleteExpense = useExpenses((state) => state.deleteExpense);
  const deleteIncome = useExpenses((state) => state?.deleteIncome);
  const [isActionDone, setIsActionDone] = useState(false);
  const [isAddTrasanctionModalOpen, setIsAddTrasanctionModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("Expense");
  const expenses = useExpenses((state) => state.expenses);
  const incomes = useExpenses((state) => state.incomes);
  const { setEditingTransaction } = useExpenses.getState();
  const handleAction = (action, txn) => {
    console.log("🚀 ~ handleAction ~ action, txn:", action, txn);
    if (action === "Edit") {
      setIsAddTrasanctionModalOpen(true);
      setActiveTab(txn?.expenseType);
      setEditingTransaction(txn);
    } else {
      // deleteTransaction(txn.id);
      // setIsActionDone(true);
      if (txn?.expenseType === "Expense") {
        deleteExpense(txn.id);
        setIsActionDone(true);
      } else {
        deleteIncome(txn.id);
        setIsActionDone(true);
      }
    }
  };

  useEffect(() => {
    let transactions;
    transactions = [...expenses, ...incomes];
    setTransactionList(transactions);
    setIsActionDone(false);
  }, [isActionDone, expenses, incomes]);
  return (
    <div>
      {" "}
      <div className="transactions-card">
        <div className="heading">Recent Transaction</div>
        <p className="transactions-subtitle">
          Manage and review your transactions
        </p>
        <div className="transactions-table">
          <div className="table-header">
            <div>Date</div>
            <div>Description</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Payment Method</div>
            <div>Actions</div>
          </div>
          {transactionList.map((txn, index) => (
            <div
              className={`table-row ${index % 2 === 0 ? "even" : ""}`}
              key={index}
            >
              <div>{txn.date}</div>
              <div
                className={`amount ${txn.expenseType === "Expense" ? "negative" : "positive"}`}
              >
                {txn.expenseType === "Expense" ? (
                  <GoArrowDownRight />
                ) : (
                  <RiArrowLeftUpLine />
                )}{" "}
                {txn.description}
              </div>
              <div>
                <span
                  className={`category-badge ${txn.expenseType === "Expense" ? "negative" : "positive"}`}
                >
                  {txn.category?.split("_")?.join(" ")}
                </span>
              </div>
              <div
                className={`txnamount ${txn.expenseType === "Expense" ? "negative" : "positive"}`}
              >
                {txn.expenseType === "Expense"
                  ? `-₹${txn.amount}`
                  : `+₹${Math.abs(txn.amount)}`}
              </div>
              <div>{txn.paymentMethod}</div>

              <div
                className="actions-cell"
                style={{
                  position: "relative",
                  cursor: "pointer",
                  bottom: "10bpx",
                }}
              >
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <div style={{ cursor: "pointer" }}>...</div>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      side="bottom"
                      align="end"
                      sideOffset={5}
                      style={{
                        background: `var(--bg-color)`,
                        border: "1px solid var(--border-color)",
                        borderRadius: "6px",
                        padding: "5px",
                        minWidth: "100px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        zIndex: 9999,
                      }}
                    >
                      {["Edit", "Delete"].map((action) => (
                        <DropdownMenu.Item
                          key={action}
                          onSelect={() => handleAction(action, txn)}
                          className={`dropdown-item`}
                          style={{
                            padding: "8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            color:
                              action === "Delete" ? "red" : "var(--text-color",
                          }}
                        >
                          {action}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddTransaction
        isAddTrasanctionModalOpen={isAddTrasanctionModalOpen}
        setIsAddTrasanctionModalOpen={setIsAddTrasanctionModalOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default TransactionsTable;
