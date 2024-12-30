import { collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const eventsRef = collection(db, "events");
