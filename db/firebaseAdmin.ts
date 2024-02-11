import "server-only";
import admin from "firebase-admin";

import serviceAccount from "../visionx-413000-firebase-adminsdk-aus09-8606f823c1.json";

export function createFirebaseAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export async function initAdmin() {
  return createFirebaseAdminApp();
}
