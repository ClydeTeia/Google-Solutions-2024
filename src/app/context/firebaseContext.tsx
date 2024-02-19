"use client"

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/config";

import { User } from 'firebase/auth'; // Make sure to import the User type from Firebase

// Define the type for the context value
interface AuthContextValue {
  user: User | null;
  emailSignIn: (email: string, password: string) => void;
  googleSignIn: () => void;
  logOut: () => void;
}

// Create the context with the default value
const AuthContext = createContext<AuthContextValue>({
  user: null,
  emailSignIn: () => { },
  googleSignIn: () => { },
  logOut: () => { },
});

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null);

  const emailSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, "logged in")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
    console.log(user?.displayName, "has logged out")
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, emailSignIn, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};