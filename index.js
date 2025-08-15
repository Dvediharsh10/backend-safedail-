const functions = require("firebase-functions"); 
const express = require("express"); 
const app = express(); 
const server = require("./server"); 
app.use(express.json()); 
app.use(server); 
exports.app = functions.https.onRequest(app); 
