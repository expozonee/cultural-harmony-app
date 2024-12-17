import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const eventsData = [
  {
    id: 0,
    event_title: "Cultural Cuisine Exchange",
    date: "2025-05-12T18:00:00Z",
    location: "Jerusalem Community Center, Jerusalem, Israel",
    host: "Peaceful Communities Initiative",
    summary:
      "A cooking workshop featuring traditional Jewish and Arab recipes.",
    description:
      "Join us for an evening of culinary delights where local Jewish and Arab chefs come together to share their family recipes. Attendees will learn about diverse culinary traditions, celebrate shared flavors, and foster understanding through food.",
  },
  {
    id: 1,
    event_title: "Interfaith Music Festival",
    date: "2025-06-20T20:00:00Z",
    location: "Haifa Waterfront Park, Haifa, Israel",
    host: "Voices of Harmony",
    summary:
      "A night of live music from Jewish, Arab, and international artists.",
    description:
      "Experience an eclectic mix of traditional and contemporary music that bridges cultural divides. Musicians from Jewish and Arab backgrounds will share the stage, performing songs that highlight the common rhythms, instruments, and melodies connecting our communities.",
  },
  {
    id: 2,
    event_title: "Shared Heritage Art Exhibit",
    date: "2025-07-15T10:00:00Z",
    location: "Old City Gallery, Nazareth, Israel",
    host: "Cultural Artisans Collective",
    summary: "Art pieces inspired by Jewish and Arab historical narratives.",
    description:
      "This exhibit showcases artworks created by local artists who draw from the rich tapestry of Jewish and Arab history. Visitors can view paintings, sculptures, and multimedia installations that celebrate heritage, honor traditions, and explore the interconnected pasts of our peoples.",
  },
  {
    id: 3,
    event_title: "Joint Storytelling Session",
    date: "2025-08-10T15:30:00Z",
    location: "Ramallah Cultural Center, Ramallah, Palestine",
    host: "Bridging Words Organization",
    summary:
      "A bilingual storytelling event featuring folk tales from both communities.",
    description:
      "Professional storytellers from Jewish and Arab backgrounds share classic folk tales, fables, and personal anecdotes. These stories highlight moral lessons, historical insights, and shared values, inviting listeners to discover common ground through the power of narrative.",
  },
  {
    id: 4,
    event_title: "Youth Sports for Unity",
    date: "2025-09-05T09:00:00Z",
    location: "Tel Aviv Community Field, Tel Aviv, Israel",
    host: "Play for Peace Association",
    summary:
      "A friendly soccer tournament with mixed teams of Jewish and Arab youth.",
    description:
      "Local youth come together to form blended teams and compete in a spirit of friendship and fairness. Through sportsmanship, cooperation, and camaraderie, this event encourages young participants to build trust, break down barriers, and lay the foundation for a more inclusive future.",
  },
];

async function saveEventsData(events) {
  try {
    for (const event of events) {
      const docRef = await addDoc(collection(db, "events"), event);
      console.log(`Document added with ID: ${docRef.id}`);
    }
    console.log("All events saved successfully!");
  } catch (error) {
    console.error("Error adding documents: ", error);
  }
}

// Call the function to save the JSON data
saveEventsData(eventsData);
