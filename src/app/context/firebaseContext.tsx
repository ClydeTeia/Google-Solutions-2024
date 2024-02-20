"use client"

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/config";

import { User } from 'firebase/auth'; // Make sure to import the User type from Firebase

// Define the type for the context value
interface AuthContextValue {
  user: User | null;
  emailSignIn: (email: string, password: string) => void;
  emailSignUp: (email: string, password: string, username: string) => void
  googleSignIn: () => void;
  logOut: () => void;
}

// Create the context with the default value
const AuthContext = createContext<AuthContextValue>({
  user: null,
  emailSignIn: () => { },
  emailSignUp: () => { },
  googleSignIn: () => { },
  logOut: () => { },
});

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null);

  const emailSignUp = async (email: string, password: string, username: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: username
        })
        console.log(user.displayName, 'has logged in')
      })
  }

  const emailSignIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
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
    <AuthContext.Provider value={{ user, emailSignIn, emailSignUp, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};