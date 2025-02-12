import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
// import SignInPage from "./components/SignInPage";
// import SignUpPage from "./components/SignUpPage";
import Dashboard from "./Pages/Dash/Dashboard";
// import InvestmentDashboard from "./Pages/Investment/InvestmentDashboard";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignedOut>
        <Routes>
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
        <div className="w-full">
          <UserButton />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
