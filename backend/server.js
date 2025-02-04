// const express = require("express");
// const dotnev = require("dotenv");
// const cors = require("cors");
// import { requireAuth } from "@clerk/express"; // Corrected import
// import { connectDB, User } from "./DbMongo.js";

// dotnev.config();
// // Connect to MongoDB
// connectDB();
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Route to save Clerk user details
// app.post("/api/save-user", requireAuth(), async (req, res) => {
//   try {
//     const { userId, emailAddresses, firstName, lastName } = req.auth.user;

//     let user = await User.findOne({ clerkId: userId });
//     if (!user) {
//       user = new User({
//         clerkId: userId,
//         email: emailAddresses[0]?.emailAddress,
//         firstName,
//         lastName,
//       });
//       await user.save();
//     }

//     res.status(200).json({ message: "User saved successfully", user });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // MongoDB URI (replace with your actual MongoDB URI)
// const mongoURI = "mongodb://localhost:27017/mydatabase";

// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// // Simple route
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Import required libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // If you want to handle Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // For environment variables

// Initialize app and configure dotenv
dotenv.config();
const app = express();

// Use middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS if necessary

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// MongoDB connection URI (this should be in your .env file for security)
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://aryanjungshah881:<db_password>@financialplannerappdb.q2h5s.mongodb.net/"; // Replace with your URI

// MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Define another route for testing
app.get("/api/test", (req, res) => {
  res.json({ message: "This is a test route." });
});

// Example error handling for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
