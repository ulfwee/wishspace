require('dotenv').config();
var admin = require("firebase-admin");
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
console.log("Key starts with:", process.env.FIREBASE_PRIVATE_KEY.substring(0, 20));

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: privateKey,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

module.exports = db;
