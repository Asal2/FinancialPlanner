// Import required packages
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aryanjungshah881:<Mothintoflame_24>@financialplannerappdb.q2h5s.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Define a sample schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);

// CRUD Operations
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log("User Created:", user);
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    console.log("Users:", users);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

// Connect to the database and perform sample operations
connectDB().then(async () => {
  await createUser({ name: "John Doe", email: "john@example.com", age: 30 });
  await getUsers();
});

module.exports = { connectDB, User };
