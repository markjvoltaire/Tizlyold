import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO7BQS9xiMfIBwvLuXaTS-OUZF0geC3qU",
  authDomain: "tizly-v1.firebaseapp.com",
  projectId: "tizly-v1",
  storageBucket: "tizly-v1.appspot.com",
  messagingSenderId: "472419105471",
  appId: "1:472419105471:web:21f63ac5a62c24836be40a",
  measurementId: "G-7WWQE66V6E",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
