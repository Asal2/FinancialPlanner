import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const { user, isSignedIn } = useUser();
  const [filteredUserData, setFilteredUserData] = useState(null);

  useEffect(() => {
    if (isSignedIn && user) {
      const filteredData = {
        id: user.id,
        name: user.fullName || `${user.firstName} ${user.lastName}`,
        email: user.primaryEmailAddress?.emailAddress || "No email",
        password: "********", // Clerk does NOT expose the actual password
      };

      setFilteredUserData(filteredData);
      console.log("Filtered User Data:", JSON.stringify(filteredData, null, 2));
    }
  }, [isSignedIn, user]);

  return null; // No UI rendering

  // return (
  //   <div>
  //     <h2>User Info</h2>
  //     {isSignedIn ? (
  //       <pre>{JSON.stringify(user, null, 2)}</pre>
  //     ) : (
  //       <p>Please sign in.</p>
  //     )}
  //   </div>
  // );
};

export default UserInfo;
