import React from "react";
import { SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const SignUpPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard"); // Redirect after successful sign-up
    }
  }, [isSignedIn, navigate]);

  return (
    <div>
      <SignedOut>
        <SignUp />
      </SignedOut>
      <SignedIn>
        <h2>Welcome, you are signed in!</h2>
      </SignedIn>
    </div>
  );
};

export default SignUpPage;
