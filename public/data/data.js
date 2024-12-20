import { readFile } from "fs/promises";
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../src/firebaseConfig.js";

async function loadJsonData() {
  try {
    const data = await readFile(
      new URL("./events.json", import.meta.url),
      "utf8"
    );
    return JSON.parse(data); // Parse JSON content
  } catch (error) {
    console.error("Failed to load JSON file:", error);
    return [];
  }
}

async function saveEventsToFirestore(events) {
  try {
    // Fetch existing events from Firestore
    const existingEventsQuery = query(collection(db, "events")); // Replace 'events' with your collection name
    const querySnapshot = await getDocs(existingEventsQuery);

    const existingIds = new Set();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id !== undefined) {
        existingIds.add(data.id);
      }
    });

    console.log("Existing event IDs:", existingIds);

    const newEvents = events.filter((event) => !existingIds.has(event.id));

    console.log(`${newEvents.length} new events to be added.`);

    for (const event of newEvents) {
      const docRef = await addDoc(collection(db, "events"), event);
      console.log(`Event added with ID: ${docRef.id}`);
    }

    console.log("All new events have been successfully saved to Firestore!");
  } catch (error) {
    console.error("Error saving events to Firestore:", error);
  }
}

(async () => {
  const eventsData = await loadJsonData(); // Load data from JSON
  await saveEventsToFirestore(eventsData); // Save data to Firestore
})();
