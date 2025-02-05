import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import Dashboard from "./Pages/Dash/Dashboard";
// import Home from "./components/Home.jsx";

export default function App() {
  return (
    // <div>
    //   <Home>
    //     <Routes>
    //       <Route path="/home" element={<Navigate to="/dashboard" />} />
    //     </Routes>
    //   </Home>
    // </div>
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
