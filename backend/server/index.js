const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 30001;

// Connection URI
const uri =
  "mongodb+srv://aryanjungshah881:Mothintoflame_2480@financialplannerappdb.q2h5s.mongodb.net/";

// Database Name
const dbName = "UserInfo";

// Create a new MongoClient
const client = new MongoClient(uri);

app.use(express.json());

app.post("/addUser", async (req, res) => {
  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("UserInformation");

    // Insert a single document
    const user = {
      name: "Asal",
      email: "asal@gmail.com",
      age: 30,
    };

    const result = await collection.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    res.status(200).send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  } finally {
    // Close the connection
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
