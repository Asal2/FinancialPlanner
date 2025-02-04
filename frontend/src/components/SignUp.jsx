import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function SignUp() {
  return (
    <div>
      <SignedIn>
        <h2>Welcome, you are signed in!</h2>
      </SignedIn>
      <SignedOut>
        <h2>Please sign in to access the app.</h2>
      </SignedOut>
    </div>
  );
}

export default SignUp;
