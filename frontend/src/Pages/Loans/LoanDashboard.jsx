import React from "react";
import Sidebar from "../Sidebar";
import LoanSummary from "./LoanSummary";
import ActiveLonas from "./ActiveLoans";

const LoanDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-2 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-center items-start space-x-10 p-2">
          <LoanSummary />
        </div>
        <ActiveLonas />
      </main>
    </div>
  );
};

export default LoanDashboard;
