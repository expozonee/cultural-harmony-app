import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function getUsers() {
  try {
    const queryUsersDB = await getDocs(collection(db, "users"));
    const usersData = queryUsersDB.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usersData;
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
}
