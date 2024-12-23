import { db } from "../src/firebase/firebaseConfig";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export async function upcomingEventsLoader() {
  try {
    const today = new Date().toISOString().split("T")[0];
    
    const eventsQuery = query(
      collection(db, "events"),
      where("date", ">=", today), 
      orderBy("date"),          
      limit(3)                  
    );

    const querySnapshot = await getDocs(eventsQuery);
    const upcomingEvents = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return upcomingEvents;
  } catch (error) {
    console.error("Error fetching upcoming events: ", error);
  }
}
