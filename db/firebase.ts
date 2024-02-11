import "server-only";
import { getFirestore } from "firebase-admin/firestore";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

export const getLinks = async () => {
  const firestore = getFirestore();
  const linkSnapshot = await firestore.collection("links").get();
  const documents = linkSnapshot.docs.map((link) => ({
    url: link.data().url,
    title: link.data().title,
    desc: link.data().desc,
  }));

  return documents;
};

export const getLogo = async () => {
  const firestore = getFirestore();
  const logoSnapshot = await firestore.collection("images").doc("logo").get();
  const logoData = logoSnapshot.data() as { url: string } | undefined;
  if (!logoSnapshot.exists || !logoData) {
    return null;
  }
  return logoData.url;
};

export const getLogoFromStorage = async () => {
  const bucket = getStorage().bucket();
  const file = bucket.file("firebase_logo_icon_171157.png");
  const imageUrl = await getDownloadURL(file);
  console.log(imageUrl);
  return imageUrl;
};
