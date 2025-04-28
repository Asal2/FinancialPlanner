import React from "react";
import Card from "../../components/Card";

const recommendationStocks = [
  { name: "Trivago", price: "$520", return: "+5%" },
  { name: "Canon", price: "$480", return: "+10%" },
  { name: "Uber Food", price: "$350", return: "-3%" },
  { name: "Nokia", price: "$940", return: "+2%" },
  { name: "Tiktok", price: "$670", return: "-12%" },
];

const Recommendation = () => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Trending Stocks</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-gray-700">Name</th>
            <th className="py-2 px-4 text-gray-700">Price</th>
            <th className="py-2 px-4 text-gray-700">Return</th>
          </tr>
        </thead>
        <tbody>
          {recommendationStocks.map((stock, index) => (
            <tr key={index} className="border-b last:border-none">
              <td className="py-3 px-4">{stock.name}</td>
              <td className="py-3 px-4">{stock.price}</td>
              <td
                className={`py-3 px-4 font-medium ${
                  stock.return.includes("-") ? "text-red-500" : "text-green-500"
                }`}>
                {stock.return}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Recommendation;
