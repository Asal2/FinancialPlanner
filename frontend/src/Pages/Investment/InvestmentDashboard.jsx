import Sidebar from "../Sidebar";
import SummaryChart from "./SummaryChart";
import RevenueChart from "./RevenueChart";
import InvestmentFunds from "./InvestmentFunds";
import Recommendation from "./Recommendation";

import MyInvestment from "./MyInvestment";

const InvestmentDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-2 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-center items-start space-x-10 p-2">
          <SummaryChart />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6 p-1 m-3">
          <RevenueChart />
          <InvestmentFunds />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6 p-1 m-3">
          <MyInvestment />
          <Recommendation />
        </div>
      </main>
    </div>
  );
};
export default InvestmentDashboard;
