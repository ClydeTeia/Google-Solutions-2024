import Image from "next/image";
import { createData, readData, updateData, deleteData } from "@/firebase/crud";
import { user } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

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

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     console.log("hello", user.displayName)
  //   } else {
  //     // router.push("/authentication")
  //     console.log("no user")
  //   }
  // });

  // if (user) {
  //   // The user object has basic properties such as display name, email, etc.
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  //   console.log("hello", displayName)
  // } else {
  //   console.log("no user sad")
  // }

  return (
    <main className="p-2">
      <h1>Home Page</h1>
      <div></div>
      <div></div>
    </main>
  );
}
