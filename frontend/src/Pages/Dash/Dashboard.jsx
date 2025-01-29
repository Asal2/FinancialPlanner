import Sidebar from "./Sidebar";
import CardsSection from "./CardsSection";
import WeeklyActivity from "./WeeklyActivity";
import ExpenseStatistics from "./ExpenseStatistics";
import BalanceHistory from "./BalanceHistory";

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
