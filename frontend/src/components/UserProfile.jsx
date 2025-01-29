// src/components/UserProfile.js
import React from "react";
import { useUser } from "@clerk/clerk-react";

const UserProfile = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.firstName}!</h2>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
};

export default UserProfile;
