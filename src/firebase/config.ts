import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("User UID:", uid);
    console.log("welcome", user.displayName)
  } else {
    console.log("No user is signed in.");
  }
});
