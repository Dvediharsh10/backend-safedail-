const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Sample API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Firebase Functions + Express!" });
});

// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);
