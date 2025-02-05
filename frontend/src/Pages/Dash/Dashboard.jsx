// import Sidebar from "."
import CardsSection from "./Card";
import WeeklyActivity from "./Chart";
import ExpenseStatistics from "./Expense";
import BalanceHistory from "./Balance";
import Transca from "./Transca";
import Sidebar from "../SideBar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-2 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-left items-start space-x-10 p-2">
          <CardsSection />
          <Transca />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6 p-1 m-3">
          <WeeklyActivity />
          <ExpenseStatistics />
        </div>
        <BalanceHistory />
      </main>
    </div>
  );
}
