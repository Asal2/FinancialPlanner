import React from "react";
import CardExpense from "./CardExpense";
import MyCards from "./MyCards";
import Sidebar from "../Sidebar";
import CardList from "./CardList";
import AddCard from "./AddCard";
import CreditScore from "./CreditScore";

const CardDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="overflow-auto flex-1 p-2 bg-gray-50">
        <div className="flex p-4 space-x-5">
          <MyCards />
          <CardExpense />
          <CreditScore />
        </div>
        <div className="flex p-4 space-x-5">
          <AddCard />
          <CardList />
        </div>
      </main>
    </div>
  );
};

export default CardDashboard;
