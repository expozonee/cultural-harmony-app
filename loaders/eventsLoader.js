import { db } from "../src/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function eventsLoader() {
  try {
    const queryEventsDB = await getDocs(collection(db, "events"));
    const eventsData = queryEventsDB.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return eventsData;
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
}
