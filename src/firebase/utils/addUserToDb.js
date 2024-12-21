import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function addUserToDb(user) {
  try {
    const queryUsersDB = await addDoc(collection(db, "users"), user);

    const usersData = queryUsersDB.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return usersData;
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
}
