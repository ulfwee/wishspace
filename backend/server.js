const db = require('./src/config/db'); 

async function checkConnection() {
  try {
    console.log("Checking Firestore connection...");
    await db.listCollections(); 
    console.log("Successfully connected to Firestore! 🔥");
  } catch (error) {
    console.error("Firestore connection failed: ", error.message);
    process.exit(1); 
  }
}

checkConnection();