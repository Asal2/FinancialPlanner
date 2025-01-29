import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Entertainment", value: 30, color: "#1e40af" },
  { name: "Bill Expense", value: 15, color: "#f97316" },
  { name: "Investment", value: 20, color: "#d946ef" },
  { name: "Others", value: 35, color: "#3b82f6" },
];

const ExpenseStatistics = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Expense Statistics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseStatistics;
