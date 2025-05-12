import React, { useState } from "react";
import TopBar from "../Components/TopBar";
import { useExpenses, useUIStore } from "../Store/useExpenses";
import LeftPanel from "../Components/LeftPanel";
import TransactionsTable from "../Components/TransactionTable";
import RollBackScreen from "../Components/RollBackScreen";
const TransactionsList = () => {
  const { isPanelCollapsed } = useUIStore();
  // const rawData = JSON.parse(localStorage.getItem("finance-storage"));
  const expenses = useExpenses((state) => state?.expenses);
  const incomes = useExpenses((state) => state?.incomes);

  const transactions = [...expenses, ...incomes];
  const [transactionList, setTransactionList] = useState(
    transactions?.length > 0 ? transactions : []
  );

  return (
    <div style={{ height: "100vh" }}>
      <TopBar />
      <div className={isPanelCollapsed ? "collapsed-container" : "container"}>
        {!isPanelCollapsed ? <LeftPanel /> : <></>}
        <div className="data-container" style={{ overflowX: "hidden" }}>
          <div className="header">
            <div className="heading">Transactions</div>
          </div>
          {expenses.length === 0 && incomes.length === 0 ? (
            <RollBackScreen />
          ) : transactionList?.length > 0 ? (
            <TransactionsTable
              transactionList={transactionList}
              setTransactionList={setTransactionList}
            />
          ) : (
            <div className="no-transactions">No transactions to show</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TransactionsList;
