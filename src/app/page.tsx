import Image from "next/image";
import { initAdmin } from "../../db/firebaseAdmin";
import { getLinks, getLogoFromStorage } from "../../db/firebase";

export default async function Home() {
  await initAdmin();
  const links = await getLinks();
  const logo = await getLogoFromStorage();

  return (
    <main className="p-2">
      <h1>Home Page</h1>
      <Image src={logo} alt={"logo"} width={100} height={24} priority></Image>
      <div></div>
      <div>
        {links?.map((link) => (
          <a href={link.url} key={link.title}>
            <h2 className="text-3xl">{link.title}</h2>
            <p>{link.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
