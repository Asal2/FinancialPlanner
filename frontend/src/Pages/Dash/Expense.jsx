import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Entertainment", value: 30, color: "#1e40af" },
//   { name: "Bill Expense", value: 15, color: "#f97316" },
//   { name: "Investment", value: 20, color: "#d946ef" },
//   { name: "Others", value: 35, color: "#3b82f6" },
// ];

const colors = ["#1e40af", "#f97316", "#d946ef", "#3b82f6"];

const ExpenseStatistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/Api/aggregated-expenses"
        );
        const result = await response.json();

        // Transform backend object { Transportation: 1023.46, Payments: 2128.5, ... }
        // into array format [{ name: "Transportation", value: 1023.46 }, ...]
        const formattedData = Object.entries(result).map(
          ([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length], // cycle colors if more categories
          })
        );

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching aggregated expenses:", error);
      }
    };

    fetchAggregatedData();
  }, []);
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
