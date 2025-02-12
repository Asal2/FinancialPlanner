import React from "react";
import Card from "../../components/Card";

const investments = [
  {
    name: "Apple Store",
    value: "$54,000",
    return: "+16%",
    category: "E-commerce, Marketplace",
    icon: "🍎",
  },
  {
    name: "Samsung Mobile",
    value: "$25,300",
    return: "-4%",
    category: "E-commerce, Marketplace",
    icon: "📱",
  },
  {
    name: "Tesla Motors",
    value: "$8,200",
    return: "+25%",
    category: "Electric Vehicles",
    icon: "🚗",
  },
];

const MyInvestment = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">My Investment</h3>
      {investments.map((inv, index) => (
        <Card
          key={index}
          className="p-6 flex justify-between items-center rounded-xl shadow-md">
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full bg-opacity-20"
              style={{
                backgroundColor:
                  index === 0 ? "#FEE2E2" : index === 1 ? "#DBEAFE" : "#FEF3C7",
              }}>
              <span className="text-3xl">{inv.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{inv.name}</h3>
              <p className="text-sm text-gray-500">{inv.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{inv.value}</p>
            <p
              className={
                inv.return.includes("-")
                  ? "text-red-500 font-semibold"
                  : "text-green-500 font-semibold"
              }>
              {inv.return}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyInvestment;
