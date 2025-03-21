import { useState } from "react";

export default function CardForm() {
  const [cardType, setCardType] = useState("credit");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  return (
    <div className="p-6 bg-gray-50 h-150 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Add New Card</h2>
        <p className="text-gray-500 mb-4">
          Credit Card generally means a plastic card issued by Scheduled
          Commercial Banks assigned to a Cardholder, with a credit limit, that
          can be used to purchase goods and services on credit or obtain cash
          advances.
        </p>

        {/* Radio Buttons */}
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Select Card Type</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="cardType"
                value="credit"
                checked={cardType === "credit"}
                onChange={() => setCardType("credit")}
                className="accent-blue-600"
              />
              Credit Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="cardType"
                value="debit"
                checked={cardType === "debit"}
                onChange={() => setCardType("debit")}
                className="accent-blue-600"
              />
              Debit Card
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Name On Card</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Card Name"
              className="w-full p-3 border rounded-lg text-gray-500 focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Expiration Date</label>
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="DD MM YYYY"
              className="w-full p-3 border rounded-lg text-gray-500 focus:outline-blue-600"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="**** **** **** ****"
            className="w-full p-3 border rounded-lg text-gray-500 focus:outline-blue-600"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          Add Card
        </button>
      </div>
    </div>
  );
}
