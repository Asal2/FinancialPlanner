const Card = ({ balance, cardNumber, holder, expiry, color }) => {
  return (
    <div className={`p-5 rounded-xl shadow-lg text-white w-72 ${color}`}>
      <h3 className="text-sm">Balance</h3>
      <p className="text-2xl font-semibold">${balance}</p>
      <p className="mt-2 text-xs">CARD HOLDER</p>
      <p className="text-lg font-bold">{holder}</p>
      <div className="mt-2 flex justify-between text-xs">
        <span>VALID THRU</span>
        <span>{expiry}</span>
      </div>
      <p className="mt-3 text-lg">{cardNumber}</p>
    </div>
  );
};

const CardsSection = () => {
  return (
    <div className="flex gap-4">
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
      />
    </div>
  );
};

export default CardsSection;
