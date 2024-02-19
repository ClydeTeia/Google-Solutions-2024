"use client"

import React from "react";
import { UserAuth } from "../context/firebaseContext";

export default function page () {
  const {user} = UserAuth();
  return (
    <div className="p-4">hello {user?.displayName}</div>
  );
};

