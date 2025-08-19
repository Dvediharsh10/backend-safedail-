const functions = require("firebase-functions");
const app = require("./server");         // your Express app exported below
exports.app = functions.https.onRequest(app);

