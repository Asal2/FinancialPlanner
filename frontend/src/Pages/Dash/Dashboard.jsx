// import Sidebar from "."
import CardsSection from "./Card";
import WeeklyActivity from "./Chart";
import ExpenseStatistics from "./Expense";
import BalanceHistory from "./Balance";
import Sidebar from "../SideBar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <CardsSection />
        <div className="grid grid-cols-2 gap-6 mt-6">
          <WeeklyActivity />
          <ExpenseStatistics />
        </div>
        <BalanceHistory />
      </main>
    </div>
  );
}
