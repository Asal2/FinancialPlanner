import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Aug", withdrawl: 0 },
  { month: "Sep", withdrawl: 0 },
  { month: "Oct", withdrawl: 7500 },
  { month: "Nov", withdrawl: 2500 },
  { month: "Dec", withdrawl: 12500 },
  { month: "Jan", withdrawl: 0 },
];

const MyExpense = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl w-full max-w-xs">
      <h3 className="text-lg font-semibold mb-4">My Expense</h3>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="withdrawl" fill="#309233" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyExpense;
