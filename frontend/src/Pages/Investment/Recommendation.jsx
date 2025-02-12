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
    <div>
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Trending Stocks</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {recommendationStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td
                  className={
                    stock.return.includes("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }>
                  {stock.return}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Recommendation;
