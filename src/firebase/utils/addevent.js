import { addDoc, collection } from "firebase/firestore";
import { db } from "/src/firebase/firebaseConfig";

export async function postEvent(eventData) {
  console.log(eventData);

  try {
    const eventsCollectionRef = collection(db, "events");
    const docRef = await addDoc(eventsCollectionRef, eventData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
  }
}
