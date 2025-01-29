import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", balance: 200 },
  { month: "Aug", balance: 400 },
  { month: "Sep", balance: 600 },
  { month: "Oct", balance: 800 },
  { month: "Nov", balance: 500 },
  { month: "Dec", balance: 700 },
  { month: "Jan", balance: 750 },
];

const BalanceHistory = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Balance History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceHistory;
