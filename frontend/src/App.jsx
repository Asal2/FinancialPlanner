import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import Dashboard from "./Pages/Dash/Dashboard";
import InvestmentDashboard from "./Pages/Investment/InvestmentDashboard";
import CardDashboard from "./Pages/CreditCard/CradDashboard";
import Transactions from "./Pages/Transcation/TransactionDashboard";
import Loans from "./Pages/Loans/LoanDashboard";
import Landing from "./Pages/LandingPage/landing";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SignedOut>
        <Routes>
          <Route index element={<Landing />} />
          <Route
            path="/sign-in"
            element={
              <div className="flex items-center justify-center min-h-screen w-full">
                <SignIn />
              </div>
            }
          />
          <Route
            path="/sign-up"
            element={
              <div className="flex items-center justify-center min-h-screen w-full">
                <SignUp />
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </SignedOut>

      <SignedIn>
        <div className="flex w-full">
          <div className="flex-1 min-h-screen">
            {/* User button at top-right */}
            <div className="flex justify-end p-4 bg-white shadow-md">
              <UserButton />
            </div>

            {/* Routes for different pages */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/investment" element={<InvestmentDashboard />} />
              <Route path="/credit-cards" element={<CardDashboard />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
