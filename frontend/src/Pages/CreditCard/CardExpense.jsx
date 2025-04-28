import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

// const data = [
//   { name: "Chase Bank", value: 500, color: "#4C78FF" },
//   { name: "BofA Bank", value: 150, color: "#FF82AC" },
//   { name: "Citi Bank", value: 70, color: "#FFBB38" },
//   { name: "ABM Bank", value: 350, color: "#16DBCC" },
// ];

const colors = ["#1e40af", "#f97316", "#d946ef", "#3b82f6"];

const CardExpense = () => {
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
