import React from "react";

const data = [
  { title: "Personal Loans", amount: "$50,000", icon: "👤" },
  { title: "Corporate Loans", amount: "$100,000", icon: "💼" },
  { title: "Business Loans", amount: "$500,000", icon: "📈" },
  { title: "Custom Loans", amount: "Choose Money", icon: "🛠️" },
];

const LoanSummary = () => {
  return (
    <div className="grid grid-cols-4 gap-45 mb-6">
      {data.map((loan, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
          <div className="text-3xl">{loan.icon}</div>
          <h4 className="text-gray-500 mt-2">{loan.title}</h4>
          <p className="text-lg font-semibold">{loan.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanSummary;
