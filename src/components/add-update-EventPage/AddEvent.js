
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "/src/firebase/firebaseConfig";
import {getDoc } from "firebase/firestore"; 

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
  //  console.log("eventId",eventId);
   
    // Get a reference to the document in the "events" collection using eventId
    const docRef = doc(db, "events", eventId);
    
    // Update the document with the new fields (using the spread operator)
    await updateDoc(docRef, updatedFields); 

    console.log("Event updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}



export async function getEventById(eventId) {
  try {
    // Get a reference to the document using the eventId
    const docRef = doc(db, "events", eventId);
    
    // Fetch the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, return the document data
      // console.log("Event data:", docSnap.data().event_title);
      return docSnap.data();
    } else {
      // If the document does not exist
      console.log("No such event!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching event:", error);
  }
}
