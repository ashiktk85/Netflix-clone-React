// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE_pY_q8_0l5qPWOHcmh7XMZI6cGDf56o",
  authDomain: "netflix-clone-ce1d8.firebaseapp.com",
  projectId: "netflix-clone-ce1d8",
  storageBucket: "netflix-clone-ce1d8.appspot.com",
  messagingSenderId: "714362795635",
  appId: "1:714362795635:web:76a33d7dc003ee83af1c06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
    alert('User signed up successfully');
  } catch (error) {
    console.error("Error during sign up:", error);
  
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('User logged in successfully');
    toast.success(success.code)
  } catch (error) {
    console.error("Error during login:", error);
   
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = async () => {
  try {
    await signOut(auth);
    alert('User logged out successfully');
  } catch (error) {
    console.error("Error during logout:", error);
    alert(`Logout error: ${error.message}`);
  }
}

export { auth, db, login, signup, logout };
