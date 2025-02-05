const TransactionCard = ({ description, amount, date, type }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white w-72">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">{description}</h3>
        <span
          className={`text-lg font-bold ${
            type === "income" ? "text-green-500" : "text-red-500"
          }`}>
          {type === "income" ? "+" : "-"}${amount}
        </span>
      </div>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  );
};

const TransactionsSection = () => {
  const transactions = [
    {
      description: "Deposit from my Card",
      amount: "850",
      date: "28 January 2021",
      type: "expense",
    },
    {
      description: "Deposit Paypal",
      amount: "2,500",
      date: "25 January 2021",
      type: "income",
    },
    {
      description: "Jemi Wilson",
      amount: "5,400",
      date: "21 January 2021",
      type: "income",
    },
  ];

  return (
    <div className="p-5 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="flex flex-col gap-4">
        {transactions.map((txn, index) => (
          <TransactionCard key={index} {...txn} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsSection;
