import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./Pages/Dash/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    // <header>
    //   <SignedOut>
    //     <SignInButton />
    //   </SignedOut>
    //   <SignedIn>
    //     <UserButton />
    //   </SignedIn>
    // </header>
  );
}
