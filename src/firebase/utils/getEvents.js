import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function getEvents() {
  try {
    const queryEventsDB = await getDocs(collection(db, "events"));

    const eventsData = queryEventsDB.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return eventsData;
  } catch (error) {
    console.error("Error fetching data from Firestore: ", error);
  }
}
