const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://spendingbook-5acaa-default-rtdb.firebaseio.com/", // Replace with your actual database URL
});

const fireStore = admin.firestore();
const auth = admin.auth();

module.exports = { fireStore, auth };
