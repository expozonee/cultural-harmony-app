import { db } from "../firebaseConfig";
import { collection, addDoc, getDoc } from "firebase/firestore";

export async function addUserToDb(user) {
  try {
    const userRef = await addDoc(collection(db, "users"), user);
    const userData = await getDoc(userRef);
    return [userRef, userData.id];
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
}
