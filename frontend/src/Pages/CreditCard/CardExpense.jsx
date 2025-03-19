import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Chase Bank", value: 500, color: "#4C78FF" },
  { name: "BofA Bank", value: 150, color: "#FF82AC" },
  { name: "Citi Bank", value: 70, color: "#FFBB38" },
  { name: "ABM Bank", value: 350, color: "#16DBCC" },
];

const CardExpense = () => {
  return (
    <div className="w-75 p-4 bg-white shadow-lg rounded-xl">
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

export default CardExpense;
