import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignedIn = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/frontend/src/Pages/Dash/Dashboard.jsx");
    }
  }, [isSignedIn, navigate]);
  return <SignedIn />;
};

export default SignIn;
