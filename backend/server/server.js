// Import required libraries
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const cors = require("cors"); // If you want to handle Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // For environment variables

// Initialize app and configure dotenv
dotenv.config();
const app = express();

// Use middleware
app.use(cors()); // Enable CORS if necessary
app.use(express.json()); // For parsing JSON request bodies

// Set the port from environment or default to 3000
const PORT = process.env.PORT || 3001;

app.post("/user-investment", (req, res) => {
  const formData = req.body; // Get the data from the request body
  const filePath = "investments.json"; // Path to the JSON file

  // Step 1: Read the existing data from the JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    let investments = [];

    // If there is an error reading the file (e.g., file doesn't exist)
    if (err) {
      if (err.code === "ENOENT") {
        // File doesn't exist, create a new one
        console.log("File not found, creating a new one...");
      } else {
        // Other read errors (e.g., permissions or corrupted file)
        console.error("Failed to read the file:", err);
        return res.status(500).send("Failed to read data file");
      }
    } else {
      // If file exists but is empty or malformed, start with an empty array
      try {
        // If the file is not empty, parse it
        if (data.trim() === "") {
          investments = []; // Handle empty file
        } else {
          investments = JSON.parse(data); // Parse the existing data
        }
      } catch (parseErr) {
        console.error("Failed to parse JSON:", parseErr); // Log parsing error
        return res.status(500).send("Invalid JSON format in data file");
      }
    }

    // Step 2: Append the new form data to the array
    investments.push(formData);

    // Step 3: Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(investments, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Failed to write data:", writeErr); // Log write error
        return res.status(500).send("Failed to save data");
      }

      res.status(200).send("Data saved successfully");
    });
  });
});

// MongoDB connection URI (this should be in your .env file for security)
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://aryanjungshah881:<db_password>@financialplannerappdb.q2h5s.mongodb.net/"; // Replace with your URI

// MongoDB connection
mongoose
  .connect(mongoURI)
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
