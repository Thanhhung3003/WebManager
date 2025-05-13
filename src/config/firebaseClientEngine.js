// Import Firebase SDK v9
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const dotenv = require('dotenv');

dotenv.config();

// Firebase client configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

// Initialize Firebase Client SDK
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const clientAuth = getAuth(firebaseApp);

// // Initialize Firestore (optional if you need it)
// const fireStore = getFirestore(firebaseApp);

// Export the clientAuth (and fireStore if needed)
module.exports = { 
    clientAuth,
    // fireStore
};
