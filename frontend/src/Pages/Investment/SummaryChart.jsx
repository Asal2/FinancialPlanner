import React from "react";

import Card from "../../components/Card";

const summaryData = [
  { title: "Total Invested Amount", value: "$150,000", icon: "💰" },
  { title: "Number of Investments", value: "250", icon: "📢" },
  { title: "Rate of Return", value: "+5.80%", icon: "🔄" },
];

const SummaryChart = () => {
  return (
    // <div className="grid grid-cols-3 gap-4">
    //   {summaryData.map((item, index) => (
    //     <Card key={index} className="p-4 text-center">
    //       <div className="text-4xl">{item.icon}</div>
    //       <h3 className="text-lg font-semibold">{item.title}</h3>
    //       <p className="text-xl font-bold">{item.value}</p>
    //     </Card>
    //   ))}
    // </div>

    <div className="grid grid-cols-3 gap-40">
      {summaryData.map((item, index) => (
        <Card
          key={index}
          className="p-6 flex items-center space-x-4 shadow-md rounded-2xl">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full bg-opacity-20"
            style={{
              backgroundColor:
                index === 0 ? "#D1FAE5" : index === 1 ? "#FEE2E2" : "#DBEAFE",
            }}>
            <span className="text-3xl">{item.icon}</span>
          </div>
          <div>
            <h3 className="text-md text-gray-500">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SummaryChart;
