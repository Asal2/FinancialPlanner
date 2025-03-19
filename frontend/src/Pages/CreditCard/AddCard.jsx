// import React, { useState } from "react";

// const AddCard = () => {
//   const [date, setDate] = useState("");

//   const [cvv, setCvv] = useState("");

//   // set up format for expiration date
//   const handleInputExpiration = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

//     if (value.length > 8) value = value.slice(0, 8); // Limit to 8 digits

//     // Add slashes automatically (MM/DD/YYYY format)
//     if (value.length > 4) {
//       value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
//     } else if (value.length > 2) {
//       value = `${value.slice(0, 2)}/${value.slice(2)}`;
//     }

//     setDate(value);
//   };

//   // set up format for cvv
//   const handleInputCvv = (e) => {
//     let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

//     if (value.length > 3) value = value.slice(0, 3); // Limit to 3 digits

//     setCvv(value);
//   };

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold pt-4 pl-4">Add Card</h2>
//       <form>
//         {/*Card Type*/}
//         <div className="p-4">
//           <label>Card Type</label>
//           <div>
//             <input
//               type="radio"
//               id="credit_card"
//               name="cardType"
//               value="Credit Card"
//             />
//             <label htmlFor="credit_card">Credit Card</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="debit_card"
//               name="cardType"
//               value="Debit Card"
//             />
//             <label htmlFor="debit-card">Debit Card</label>
//           </div>
//         </div>

//         {/* Card Number and Name On Card*/}
//         <div className="flex gap-4 p-4">
//           <div className="flex flex-col">
//             <label htmlFor="card_number">Card Number</label>
//             <input
//               type="text"
//               id="card_number"
//               pattern="\d{12}"
//               minLength="12"
//               maxLength="12"
//               inputMode="numeric"
//               placeholder="Enter card number"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="name_on_card">Name On Card</label>
//             <input
//               type="text"
//               id="name_on_card"
//               placeholder="Card Holder Name"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Expiration date & CVV */}
//         <div className="flex gap-4 p-4">
//           <div className="flex flex-col">
//             <label htmlFor="expiration_date">Expiration Date</label>
//             <input
//               type="text"
//               id="expiration_date"
//               placeholder="MM/DD/YYYY"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={date}
//               onChange={handleInputExpiration}
//               inputMode="numeric"
//               maxLength="10" // 8 digits + 2 slashes
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="cvv">CVV</label>
//             <input
//               type="text"
//               id="cvv"
//               placeholder="123"
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={cvv}
//               onChange={handleInputCvv}
//               inputMode="numeric"
//               maxLength="3"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCard;

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
