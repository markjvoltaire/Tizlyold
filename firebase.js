// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk9Hu8FtqHB6hWl9LBsSK-LW7iOExTFII",
  authDomain: "tizlybuild.firebaseapp.com",
  projectId: "tizlybuild",
  storageBucket: "tizlybuild.appspot.com",
  messagingSenderId: "250802462742",
  appId: "1:250802462742:web:ff7f05b6841da34d005537",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export default firebase;
