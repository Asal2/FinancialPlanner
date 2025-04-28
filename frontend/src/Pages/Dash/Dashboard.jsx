// import Sidebar from "."
import CardsSection from "./Card";
import WeeklyActivity from "./Chart";
import ExpenseStatistics from "./Expense";
import BalanceHistory from "./Balance";
import Transca from "./Transca";
import Sidebar from "../SideBar";

import UserInfo from "../../components/UserInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/signin"); // Redirect if not signed in
    }
  }, [isSignedIn, navigate]);
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-2 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-left items-start space-x-10 p-2">
          <CardsSection />
          <Transca />
          <UserInfo />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6 p-1 m-3">
          <WeeklyActivity />
          <ExpenseStatistics />
        </div>
        <BalanceHistory />
      </main>
    </div>
  );
};
export default Dashboard;
