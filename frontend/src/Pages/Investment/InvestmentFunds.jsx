import React from "react";
import Card from "../../components/Card";

const investment = [
  { name: "Vanguard 500 Index Fund", price: "$120", return: "+5%" },
  { name: "S&P 500 Index Fund", price: "$60", return: "+10%" },
  { name: "Fidelity Contrafund", price: "$600", return: "-3%" },
  { name: "American Funds Growth Fund", price: "$1000", return: "+2%" },
  { name: "iShares Russell 2000 ETF", price: "$50", return: "-12%" },
];

const InvestmentFunds = () => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Investment Funds</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-gray-700">Name</th>
            <th className="py-2 px-4 text-gray-700">Price</th>
            <th className="py-2 px-4 text-gray-700">Return</th>
          </tr>
        </thead>
        <tbody>
          {investment.map((fund, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="py-3 px-4">{fund.name}</td>
              <td className="py-3 px-4">{fund.price}</td>
              <td
                className={`py-3 px-4 font-medium ${
                  fund.return.includes("-") ? "text-red-500" : "text-green-500"
                }`}>
                {fund.return}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default InvestmentFunds;
