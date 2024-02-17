import Image from "next/image";
import { createData, readData, updateData, deleteData } from "@/firebase/crud";
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from "firebase/auth";
import { user } from "@/firebase/config";

export default function Home() {
  // CRUD TESTS

  // await createData("code", {
  //   name: "hihello",
  //   new: "222"
  // })

  // await readData("code", "name", "hi");

  // await updateData("code","name","hi",{
  //   "ssk": "11233"
  // })

  // await deleteData("code","new","222")
  // const router = useRouter();

  if (user) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    console.log("hello", displayName, email)
  } else {
    console.log("no user sad")
  }

  return (
    <main className="p-2">
      <h1>Home Page</h1>
      <div></div>
      <div></div>
    </main>
  );
}
