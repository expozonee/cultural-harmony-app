import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import dotenv from "dotenv";

if (typeof import.meta === "undefined") {
  dotenv.config();
}

const isVite = typeof import.meta !== "undefined" && import.meta.env;

const firebaseConfig = {
  apiKey: isVite
    ? import.meta.env.VITE_FIREBASE_API_KEY
    : process.env.FIREBASE_API_KEY,
  authDomain: isVite
    ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
    : process.env.FIREBASE_AUTH_DOMAIN,
  projectId: isVite
    ? import.meta.env.VITE_FIREBASE_PROJECT_ID
    : process.env.FIREBASE_PROJECT_ID,
  storageBucket: isVite
    ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
    : process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isVite
    ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
    : process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: isVite
    ? import.meta.env.VITE_FIREBASE_APP_ID
    : process.env.FIREBASE_APP_ID,
  measurementId: isVite
    ? import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    : process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
