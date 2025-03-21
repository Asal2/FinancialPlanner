import React, { useState } from "react";

const transactions = [
  {
    description: "Spotify Subscription",
    transactionId: "#12548796",
    type: "Shopping",
    card: "**** 1234",
    date: "28 Jan, 12:30 AM",
    amount: -2500,
  },
  {
    description: "Freepik Sales",
    transactionId: "#12548796",
    type: "Transfer",
    card: "**** 9897",
    date: "25 Jan, 10:40 PM",
    amount: 750,
  },
  {
    description: "Mobile Service",
    transactionId: "#12548796",
    type: "Service",
    card: "**** 3836",
    date: "20 Jan, 10:40 PM",
    amount: -150,
  },
  {
    description: "Wilson",
    transactionId: "#12548796",
    type: "Transfer",
    card: "**** 5869",
    date: "15 Jan, 03:29 PM",
    amount: -1050,
  },
  {
    description: "Emilly",
    transactionId: "#12548796",
    type: "Transfer",
    card: "**** 6524",
    date: "14 Jan, 10:40 PM",
    amount: 840,
  },
];

const RecentTransactions = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter transactions based on tab
  const filteredTransactions = transactions.filter((txn) => {
    if (selectedTab === "income") return txn.amount > 0;
    if (selectedTab === "expense") return txn.amount < 0;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2 text-gray-600">
        {["all", "income", "expense"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`pb-2 ${
              selectedTab === tab
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}>
            {tab === "all"
              ? "All Transactions"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="mt-4 overflow-x-auto max-h-80">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="p-3">Description</th>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Type</th>
              <th className="p-3">Card</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{txn.description}</td>
                <td className="p-3">{txn.transactionId}</td>
                <td className="p-3">{txn.type}</td>
                <td className="p-3">{txn.card}</td>
                <td className="p-3">{txn.date}</td>
                <td
                  className={`p-3 font-medium ${
                    txn.amount > 0 ? "text-green-500" : "text-red-500"
                  }`}>
                  {txn.amount > 0 ? `+${txn.amount}` : txn.amount}
                </td>
                <td className="p-3">
                  <button
                    className={`px-4 py-1 rounded-lg ${
                      txn.amount > 0
                        ? "border border-green-500 text-green-500"
                        : "bg-blue-500 text-white"
                    }`}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-gray-600">
        <button className="text-sm">&lt; Previous</button>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                page === 1 ? "bg-blue-500 text-white" : "border"
              }`}>
              {page}
            </button>
          ))}
        </div>
        <button className="text-sm">Next &gt;</button>
      </div>
    </div>
  );
};

export default RecentTransactions;
