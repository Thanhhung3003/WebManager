// Firebase configuration
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD22ncWadA0h9kOOQ2wwYOn5RZckjSHCKk",
    authDomain: "localhost",
    // authDomain: "android12-9ff98.firebaseapp.com",
    projectId: "android12-9ff98",
    storageBucket: "android12-9ff98.firebasestorage.app",
    messagingSenderId: "389723461255",
    appId: "1:389723461255:web:89bfad4007e493e4b7ca22",
    measurementId: "G-H11BE5D5KW"
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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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