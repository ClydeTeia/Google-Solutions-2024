"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/firebaseContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/profile">Profile</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/classroom">Classroom</Link>
        </li>
      </ul>
      {user ?
        <ul className="flex">
          <li className="p-2">
            Hello {user.displayName}
          </li>
          <Button variant={"destructive"} onClick={() => {
            logOut();
          }}>
            Sign Out
          </Button>
        </ul> :
        <ul className="flex">
          <li className="p-2 cursor-pointer" onClick={() => router.push("/login")}>Login</li>
          <li className="p-2 cursor-pointer" onClick={() => router.push("/signup")}>Signup</li>
        </ul>
      }
    </div>
  );
}
