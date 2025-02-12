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
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Investment Funds</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {investment.map((fund, index) => (
            <tr key={index}>
              <td>{fund.name}</td>
              <td>{fund.price}</td>
              <td
                className={
                  fund.return.includes("-") ? "text-red-500" : "text-green-500"
                }>
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
