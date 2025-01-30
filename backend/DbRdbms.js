// Import required packages
const mysql = require("mysql2");
require("dotenv").config();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "financial_planner_app",
});

// Connect to MySQL
const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error("MySQL connection error:", err);
      process.exit(1);
    }
    console.log("MySQL Connected");
  });
};

// Define a sample table creation query
const createTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT NOT NULL
    )`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Users table ready");
    }
  });
};

// CRUD Operations
const createUser = (userData) => {
  const query = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(
    query,
    [userData.name, userData.email, userData.age],
    (err, result) => {
      if (err) {
        console.error("Error creating user:", err);
      } else {
        console.log("User Created:", result.insertId);
      }
    }
  );
};

const getUsers = () => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
    } else {
      console.log("Users:", results);
    }
  });
};

// Connect to the database and perform sample operations
connectDB();
createTable();
createUser({ name: "John Doe", email: "john@example.com", age: 30 });
getUsers();

module.exports = { db, connectDB };
