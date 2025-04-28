import React from "react";
import MyCard from "./MyCard";
import Sidebar from "../SideBar";
import MyExpense from "./MyExpense";
import RecentTransactions from "./RecentTranscation";

const TransactionDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-2 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-left items-start space-x-10 p-2">
          <MyCard />
          <MyExpense />
        </div>
        <RecentTransactions />
      </main>
    </div>
  );
};

export default TransactionDashboard;
