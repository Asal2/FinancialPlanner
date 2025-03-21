export default function CardList() {
  const cards = [
    {
      id: 1,
      bank: "Chase Bank",
      cardNumber: "**** **** 5600",
      type: "Secondary",
      owner: "Asal",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      bank: "BofA Bank",
      cardNumber: "**** **** 4300",
      type: "Secondary",
      owner: "Asal",
      iconColor: "bg-red-100 text-red-600",
    },
    {
      id: 3,
      bank: "Citi Bank",
      cardNumber: "**** **** 7560",
      type: "Secondary",
      owner: "Asal",
      iconColor: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Card List</h2>
      <div className="space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-xl">
            {/* Icon */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg ${card.iconColor}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M3 14h18M3 6h18M3 18h18"
                />
              </svg>
            </div>

            {/* Card Details */}
            <div className="flex-1 ml-4 grid grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500">Card Type</p>
                <p className="text-blue-600">{card.type}</p>
              </div>
              <div>
                <p className="text-gray-500">Bank</p>
                <p className="text-blue-600">{card.bank}</p>
              </div>
              <div>
                <p className="text-gray-500">Card Number</p>
                <p className="text-blue-600">{card.cardNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">Namain Card</p>
                <p className="text-blue-600">{card.owner}</p>
              </div>
            </div>

            {/* View Details */}
            <a href="#" className="text-blue-600 font-semibold">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
