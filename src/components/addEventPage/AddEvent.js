
import { db } from "../src/firebase/firebaseConfig";


export const postEvent = async (newEvent) => {
    try {
      const docRef = await db.collection("events").add({
        ...newEvent, 
      });
      console.log("Event successfully added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document to Firestore:", error);
    }
  };