// Firebase configuration
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUaKsgFAKjn0On0DXdjK_7TijyTOG94Bo",
  authDomain: "localhost",
  //authDomain: "spendingbook-5acaa.firebaseapp.com",
  projectId: "spendingbook-5acaa",
  storageBucket: "spendingbook-5acaa.firebasestorage.app",
  messagingSenderId: "724530123449",
  appId: "1:724530123449:web:7a13f10994ce3619d2c168",
  measurementId: "G-EXCVH3N251",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Client SDK initialized successfully.");

// login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Login form submitted.");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      var token = user.stsTokenManager.accessToken;

      console.log("User logged in successfully token:", token);
      const uid = user.uid;
      window.location.href = `/check-role?uid=${uid}&token=${token}`;
    } catch (error) {
      console.error("Login failed:", error.code, error.message);
      alert("Login failed: " + error.code + error.message);
    }
  });
}

export async function resetPassword(email) {
  console.log("Resetting password for email:", email);
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent successfully.");
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}
