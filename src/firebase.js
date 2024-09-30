import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDluxcH4I8bGByrsxQBC7P5iOSqzSnfyFM",
  authDomain: "tchinda-ecommerce.firebaseapp.com",
  projectId: "tchinda-ecommerce",
  storageBucket: "tchinda-ecommerce.appspot.com",
  messagingSenderId: "271545910747",
  appId: "1:271545910747:web:4fdd7ed7c9ca5ff52513fe",
  measurementId: "G-46DHGF1RJD"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

