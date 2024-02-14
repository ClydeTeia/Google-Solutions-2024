import Image from "next/image";
import {
  createData,
  readData,
  updateData,
  deleteData
} from "@/firebase/crud";

export default async function Home() {
  // CRUD TESTS

  // await createData("code", {
  //   name: "hihello",
  //   new: "222"
  // })

  // await readData("code", "name", "hi");

  await updateData("code","name","hi",{
    "ssk": "11233"
  })

  // await deleteData("code","new","222")

  return (
    <main className="p-2">
      <h1>Home Page</h1>
      {/* <Image src={logo} alt={"logo"} width={100} height={24} priority></Image> */}
      <div></div>
      <div>
        {/* {links?.map((link) => (
          <a href={link.url} key={link.title}>
            <h2 className="text-3xl">{link.title}</h2>
            <p>{link.desc}</p>
          </a>
        ))} */}
      </div>
    </main>
  );
}
