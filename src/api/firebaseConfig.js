// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIUfwOSwWF9L-c7RLFLNkSMJsOhA4_hAU",
  authDomain: "quiz-app-250be.firebaseapp.com",
  projectId: "quiz-app-250be",
  storageBucket: "quiz-app-250be.appspot.com",
  messagingSenderId: "948991664859",
  appId: "1:948991664859:web:94d5e30ffd7b8d08fa62fe",
  measurementId: "G-60BMT0CMLX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
