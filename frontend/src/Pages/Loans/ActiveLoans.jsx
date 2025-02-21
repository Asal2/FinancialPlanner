import React from "react";

const loans = [
  {
    amount: "$100,000",
    leftToRepay: "$40,500",
    duration: "8 Months",
    interest: "12%",
    installment: "$2,000 / month",
  },
  {
    amount: "$500,000",
    leftToRepay: "$250,000",
    duration: "36 Months",
    interest: "10%",
    installment: "$8,000 / month",
  },
  {
    amount: "$900,000",
    leftToRepay: "$40,500",
    duration: "12 Months",
    interest: "12%",
    installment: "$5,000 / month",
  },
  {
    amount: "$50,000",
    leftToRepay: "$40,500",
    duration: "25 Months",
    interest: "5%",
    installment: "$2,000 / month",
  },
  {
    amount: "$50,000",
    leftToRepay: "$40,500",
    duration: "5 Months",
    interest: "16%",
    installment: "$10,000 / month",
  },
  {
    amount: "$80,000",
    leftToRepay: "$25,500",
    duration: "14 Months",
    interest: "8%",
    installment: "$2,000 / month",
  },
  {
    amount: "$12,000",
    leftToRepay: "$5,500",
    duration: "9 Months",
    interest: "13%",
    installment: "$500 / month",
  },
  {
    amount: "$160,000",
    leftToRepay: "$100,800",
    duration: "3 Months",
    interest: "12%",
    installment: "$900 / month",
  },
];

const ActiveLonas = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">Active Loans Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              {[
                "SL No",
                "Loan Money",
                "Left to repay",
                "Duration",
                "Interest rate",
                "Installment",
                "Repay",
              ].map((header, i) => (
                <th key={i} className="p-3 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{String(index + 1).padStart(2, "0")}.</td>
                <td className="p-3">{loan.amount}</td>
                <td className="p-3">{loan.leftToRepay}</td>
                <td className="p-3">{loan.duration}</td>
                <td className="p-3">{loan.interest}</td>
                <td className="p-3">{loan.installment}</td>
                <td className="p-3">
                  <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg">
                    Repay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-red-500 font-semibold">
              <td className="p-3">Total</td>
              <td className="p-3">$125,0000</td>
              <td className="p-3">$750,000</td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3">$50,000 / month</td>
              <td className="p-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ActiveLonas;
