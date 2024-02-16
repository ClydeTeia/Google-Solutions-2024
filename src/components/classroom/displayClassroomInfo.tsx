import { Separator } from "@radix-ui/react-separator";
import React from "react";

const studentData = [
  {
    name: "John Doe",
    email: "jondoe@gmail.com",
  },
  {
    name: "Jane Doe",
    email: "ndoe@gmail.com",
  },
  {
    name: "John Smith",
    email: "johnsmith@gmail.com",
  },
  {
    name: "John Doe",
    email: "jondoe@gmail.com",
  },
  {
    name: "Jane Doe",
    email: "ndoe@gmail.com",
  },
  {
    name: "John Smith",
    email: "johnsmith@gmail.com",
  },
  {
    name: "John Doe",
    email: "jondoe@gmail.com",
  },
  {
    name: "Jane Doe",
    email: "ndoe@gmail.com",
  },
  {
    name: "John Smith",
    email: "johnsmith@gmail.com",
  },
  {
    name: "John Doe",
    email: "jondoe@gmail.com",
  },
  {
    name: "Jane Doe",
    email: "ndoe@gmail.com",
  },
  {
    name: "John Smith",
    email: "johnsmith@gmail.com",
  },
  {
    name: "John Doe",
    email: "jondoe@gmail.com",
  },
  {
    name: "Jane Doe",
    email: "ndoe@gmail.com",
  },
  {
    name: "John Smith",
    email: "johnsmith@gmail.com",
  },
];

type Props = {};

export default function DisplayClassroomInfo({}: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <h3>Classroom Info:</h3>
      <div className="w-full h-full">
        {studentData.map((student) => {
          return (
            <div key={student.name}>
              <div>{student.name}</div>
              <div>{student.email}</div>
              <Separator className="h-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
