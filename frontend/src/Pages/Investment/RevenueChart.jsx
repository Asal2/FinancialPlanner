import React from "react";

import Card from "../../components/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { year: 2016, revenue: 10000 },
  { year: 2017, revenue: 20000 },
  { year: 2018, revenue: 30000 },
  { year: 2019, revenue: 25000 },
  { year: 2020, revenue: 22000 },
  { year: 2021, revenue: 35000 },
];

const RevenueChart = () => {
  return (
    <div>
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default RevenueChart;
