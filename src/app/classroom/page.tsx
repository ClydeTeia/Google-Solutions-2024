"use client";

// import {
//   createClassroom,
//   addStudentToClassroom,
// } from "../../../utils/classroom/createClassroom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Delete } from "@/components/buttons/deleteButton";
import DisplayClassroomInfo from "@/components/classroom/displayClassroomInfo";

const classroomData = [
  {
    id: "123",
    name: "Intermediate",
    teacherID: "123",
    students: [],
  },
  {
    id: "456",
    name: "ASL 101",
    teacherID: "123",
    students: [],
  },
];

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

export default function Classroom({}: Props) {
  // const [classroomId, setClassroomId] = useState("");
  // const [studentData, setStudentData] = useState<{
  //   name: string;
  //   email: string;
  // }>({ name: "", email: "" });

  // const handleCreateClassroom = async () => {
  //   const classroomId = await createClassroom({
  //     name: "Math",
  //     teacherID: "123",
  //     students: [],
  //   });
  //   if (classroomId) {
  //     setClassroomId(classroomId);
  //   }
  // };

  // addStudentToClassroom(classroomId, { name: "John Doe", age: 15, grade: 10 });

  return (
    <main>
      <div>
        <div className="flex justify-between items-center mx-10 my-5">
          <h3>Classroom Panel</h3>
          <Button className="w-36">Create Classroom</Button>
        </div>

        {/* <div>
          {classroomData.map((classroom) => {
            return (
              <div
                className="flex justify-between items-center mx-10 my-5"
                key={classroom.id}
              >
                <h3>{classroom.name}</h3>
                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-5xl h-5/6 p-10 border-none">
                      <ScrollArea className="h-full w-full rounded-md border p-4">
                        <DialogHeader>
                          <DialogTitle className="py-5">
                            View Classroom
                          </DialogTitle>
                          <Separator />
                          <DialogDescription>
                            View and edit classroom details
                          </DialogDescription>
                        </DialogHeader>

                        {studentData.map((student) => {
                          return (
                            <div key={student.email} className="group">
                              <div className="flex flex-row justify-between items-center mx-3 my-3 ">
                                <div className="grid grid-cols-2 justify-between w-full">
                                  <div>
                                    <Label>Name</Label>
                                    <p>{student.name}</p>
                                  </div>
                                  <div className="flex justify-between">
                                    <div>
                                      <Label>Email</Label>
                                      <p>{student.email}</p>
                                    </div>
                                    <div className="hidden group-hover:flex text-white transition-all duration-300 transform translate-x-4 items-center mx-5">
                                      <Delete id={student.email} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Separator />
                            </div>
                          );
                        })}
                        <DialogFooter className="pt-7 pb-3 pr-10">
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" className="w-20">
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div> */}

        <div className="flex w-full h-full">
          <div className="w-1/3 h-full">
            <h3 className="ml-4">Classrooms</h3>
            {classroomData.map((classroom) => {
              return (
                <div key={classroom.id}>
                  <Button className="flex flex-row w-full rounded-none">
                    <h3>{classroom.name}</h3>
                  </Button>
                  <Separator />
                </div>
              );
            })}
          </div>
          <div className="w-full h-full">
            <DisplayClassroomInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
