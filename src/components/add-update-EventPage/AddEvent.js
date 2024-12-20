
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "/src/firebase/firebaseConfig";


 export async function postEvent(eventData) {
  try {
    const eventsCollectionRef = collection(db, "events");
    const docRef = await addDoc(eventsCollectionRef, eventData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document to Firestore:", error);
  }
}

export async function DeleteEvent(eventId) {
  try {
    // Get a reference to the document you want to delete
    const docRef = doc(db, "events", eventId); // You need to specify the document ID
    
    // Delete the document
    await deleteDoc(docRef); 

    console.log("Event deleted with ID:", eventId);
  } catch (error) {
    console.error("Error deleting document from Firestore:", error);
  }
}

export async function updateEvent(eventId, updatedFields) {
  try {
    // Get a reference to the document in the "events" collection using eventId
    const docRef = doc(db, "events", eventId);
    
    // Update the document with the new fields (using the spread operator)
    await updateDoc(docRef, updatedFields); 

    console.log("Event updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}