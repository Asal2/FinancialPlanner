import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export default function UserAuthetication() {
  const { userId, getToken } = useAuth();

  const handleSendData = async () => {
    try {
      const token = await getToken(); // Get Clerk JWT

      const response = await axios.post(
        "http://localhost:5000/api/user-data",
        { message: "Hello from Clerk!" },
        { headers: { Authorization: `Bearer ${token}` } } // Attach JWT
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h1>Welcome, User {userId}</h1>
      <button onClick={handleSendData}>Send Data to Backend</button>
    </div>
  );
}
