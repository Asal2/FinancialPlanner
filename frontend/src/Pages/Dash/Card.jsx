// components/Card.jsx
import React from "react";

const Card = ({ balance, cardNumber, holder, expiry, color, brand }) => {
  return (
    <div
      className={`p-5 rounded-2xl shadow-lg text-white w-80 ${color} relative`}>
      {/* Card Balance */}
      <p className="text-xs">Balance</p>
      <h2 className="text-2xl font-semibold">${balance}</h2>

      {/* Card Chip Icon (Placeholder for now) */}
      <div className="absolute top-5 right-5 w-8 h-6 bg-gray-400 rounded-md"></div>

      {/* Cardholder Details */}
      <div className="mt-4">
        <p className="text-xs">CARD HOLDER</p>
        <p className="font-medium text-lg">{holder}</p>
      </div>

      {/* Validity Date */}
      <div className="mt-3 flex justify-between text-xs">
        <span>VALID THRU</span>
        <span className="font-medium">{expiry}</span>
      </div>

      {/* Card Number */}
      <p className="mt-4 text-lg tracking-widest">{cardNumber}</p>

      {/* Visa Logo (if applicable)
      {brand === "visa" && (
        <div className="absolute bottom-5 right-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            className="w-10"
          />
        </div>
      )} */}
    </div>
  );
};

const CardsSection = () => {
  return (
    <div className=" p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-semibold mb-4">My Cards</h3>

      <div className="flex space-x-5">
        <Card
          balance="6,214"
          cardNumber="2473 **** **** 4381"
          holder="Asal Sharma Dhungana"
          expiry="12/27"
          color="bg-black"
        />

        <Card
          balance="5,756"
          cardNumber="3778 **** **** 1234"
          holder="Asal Sharma Dhungana"
          expiry="12/26"
          color="bg-green-500"
          brand="visa"
        />
      </div>
    </div>
  );
};

export default CardsSection;
