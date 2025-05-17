//
import { useForm } from "react-hook-form";

export default function CardForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardType: "credit",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="p-6 bg-gray-50 h-150 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Add New Card</h2>
        <p className="text-gray-500 mb-4">
          Credit Card generally means a plastic card issued by Scheduled
          Commercial Banks assigned to a Cardholder...
        </p>

        {/* Radio Buttons */}
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Select Card Type</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="credit"
                {...register("cardType")}
                className="accent-blue-600"
              />
              Credit Card
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="debit"
                {...register("cardType")}
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
              placeholder="Card Name"
              {...register("cardName", { required: "Name is required" })}
              className="w-full p-3 border rounded-lg text-gray-500 focus:outline-blue-600"
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm">{errors.cardName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Expiration Date</label>
            <input
              type="text"
              placeholder="DD MM YYYY"
              {...register("expirationDate", { required: "Date is required" })}
              className="w-full p-3 border rounded-lg text-gray-500 focus:outline-blue-600"
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm">
                {errors.expirationDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Card Number</label>
          <input
            type="text"
            placeholder="**** **** **** ****"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{4} \d{4} \d{4} \d{4}$/,
                message: "Enter card number in format: 1234 5678 9012 3456",
              },
            })}
            className="w-full p-3 border rounded-lg text-gray-500 focus:outline-blue-600"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          Add Card
        </button>
      </form>
    </div>
  );
}
