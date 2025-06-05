// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtBBV2NDP5-cYJjK8yzMqDoxJCsg5x8kU",
  authDomain: "e-commerce-4ee51.firebaseapp.com",
  projectId: "e-commerce-4ee51",
  storageBucket: "e-commerce-4ee51.firebasestorage.app",
  messagingSenderId: "831240095782",
  appId: "1:831240095782:web:43844f81499c8c5baabee7",
  measurementId: "G-0ZVDKSGLGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// ✅ Set up Google Provider
const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set persistence:", error);
});

// ✅ Export them
export { auth, provider, signInWithPopup };