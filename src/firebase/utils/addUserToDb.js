import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function addUserToDb(user) {
  try {
    await addDoc(collection(db, "users"), user);
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
}
