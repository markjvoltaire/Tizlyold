// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcNTewjm7WSSiSEh0qhj-LqTHPU-MhiSc",
  authDomain: "tizly-4eb6e.firebaseapp.com",
  projectId: "tizly-4eb6e",
  storageBucket: "tizly-4eb6e.appspot.com",
  messagingSenderId: "236933689486",
  appId: "1:236933689486:web:201d37dbec92bd86c019df",
  measurementId: "G-ESFYHV0HN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
