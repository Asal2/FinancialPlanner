import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sat", deposit: 200, withdraw: 400 },
  { day: "Sun", deposit: 150, withdraw: 350 },
  { day: "Mon", deposit: 300, withdraw: 450 },
  { day: "Tue", deposit: 250, withdraw: 500 },
  { day: "Wed", deposit: 100, withdraw: 300 },
  { day: "Thu", deposit: 280, withdraw: 430 },
  { day: "Fri", deposit: 270, withdraw: 410 },
];

const WeeklyActivity = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="deposit" fill="#22c55e" />
          <Bar dataKey="withdraw" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyActivity;
