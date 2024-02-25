import { db } from "../../src/firebase/config";
import { addDoc, collection } from "firebase/firestore";

type ClassroomData = {
  name: string;
  teacherID: string;
  students: string[];
};

type StudentData = {
  name: string;
  email: string;
};

type ClassroomId = {
  id: string;
};

export async function createClassroom(classroomData: ClassroomData) {
  try {
    const docRef = await addDoc(collection(db, "classrooms"), classroomData);
    console.log("Classroom created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating classroom: ", error);
  }
}

export async function addStudentToClassroom(
  classroomId: ClassroomId,
  studentData: StudentData
) {
  try {
    await addDoc(
      collection(db, `classrooms/${classroomId}/students`),
      studentData
    );
    console.log("Student added to classroom.");
  } catch (error) {
    console.error("Error adding student to classroom: ", error);
  }
}
