import Sidebar from "./Sidebar";

import { useState } from "react";

export default function InvestmentForm() {
  const [formData, setFormData] = useState({
    totalInvestment: "",
    yearlyInvestment: "",
    annualSalary: "",
    riskTolerance: "",
    age: "",
    retirementYear: "",
    portfolioManagement: "",
    investmentPlatform: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    try {
      const res = await fetch("http://localhost:3001/user-investment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Form submitted successfully");
      } else {
        alert("Error submitting form");
      }
    } catch (err) {
      console.log("Error submitting form", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="py-10 max-w-auto mx-auto">
        <div className="p-10 bg-white rounded-2xl max-h-200 ">
          <h2 className="text-2xl p-15 font-bold mb-6 text-center">
            Investment Information
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <input
              type="number"
              name="totalInvestment"
              value={formData.totalInvestment}
              onChange={handleChange}
              placeholder="Total Investment"
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="number"
              name="yearlyInvestment"
              value={formData.yearlyInvestment}
              onChange={handleChange}
              placeholder="Investment This Year"
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="number"
              name="annualSalary"
              value={formData.annualSalary}
              onChange={handleChange}
              placeholder="Annual Salary"
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="number"
              name="riskTolerance"
              value={formData.riskTolerance}
              onChange={handleChange}
              placeholder="Risk Tolerance (1-10)"
              className="w-full p-3 border rounded"
              required
              min="1"
              max="10"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="number"
              name="retirementYear"
              value={formData.retirementYear}
              onChange={handleChange}
              placeholder="Target Retirement Year"
              className="w-full p-3 border rounded"
              required
            />

            <select
              name="portfolioManagement"
              value={formData.portfolioManagement}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required>
              <option value="">Select Portfolio Management</option>
              <option value="1">
                I don't want to manually allocate my funds
              </option>
              <option value="2">
                I am open to manually reallocating my funds
              </option>
              <option value="3">I can comfortably reallocate my funds</option>
            </select>

            <select
              name="investmentPlatform"
              value={formData.investmentPlatform}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required>
              <option value="">Select Investment Platform</option>
              <option value="Fidelity">Fidelity</option>
              <option value="Vanguard">Vanguard</option>
            </select>

            <div className="col-span-1 sm:col-span-2 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-1/2 bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
