// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMkq9x9rPok5mNeliqyZrrCmaAdRsXHPQ",
  authDomain: "taskify-d956e.firebaseapp.com",
  projectId: "taskify-d956e",
  storageBucket: "taskify-d956e.appspot.com",
  messagingSenderId: "740920669562",
  appId: "1:740920669562:web:d4e8cc42ecf33791d392c3",
  measurementId: "G-V15L8QFE63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);