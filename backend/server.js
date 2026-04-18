const db = require('./src/config/db'); 
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

async function start() {
  await checkConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

start();

async function checkConnection() {
  try {
    console.log("Checking Firestore connection");
    await db.listCollections(); 
    console.log("Successfully connected to Firestore!");
  } catch (error) {
    console.error("Firestore connection failed: ", error.message);
    process.exit(1); 
  }
}

