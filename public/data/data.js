import { collection, addDoc } from "firebase/firestore";
import { db } from "../../src/firebaseConfig.js";

const eventsData = [
  {
    id: 1,
    event_title: "Cultural Cuisine Exchange",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2025-05-12",
    event_start_time: "18:00",
    location: { lat: 31.7683, lng: 35.2137, city_name: "Jerusalem" },
    event_host_name: "israel litvak",
    summary:
      "A cooking workshop featuring traditional Jewish and Arab recipes.",
    description:
      "Join us for an evening of culinary delights where local Jewish and Arab chefs come together to share their family recipes. Attendees will learn about diverse culinary traditions, celebrate shared flavors, and foster understanding through food.",
    contribution_list: [
      { item_name: "Sambusak", user: "undifined" },
      { item_name: "Hummus", user: "undifined" },
      { item_name: "Knafeh", user: "undifined" },
    ],
    participants: [],
    max_participants: 5,
  },
  {
    id: 2,
    event_title: "Interfaith Music Festival",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2025-06-20",
    event_start_time: "20:00",
    location: { lat: 32.794, lng: 34.9896, city_name: "Haifa" },
    event_host_name: "israel litvak",
    summary:
      "A night of live music from Jewish, Arab, and international artists.",
    description:
      "Experience an eclectic mix of traditional and contemporary music that bridges cultural divides. Musicians from Jewish and Arab backgrounds will share the stage, performing songs that highlight the common rhythms, instruments, and melodies connecting our communities.",
    contribution_list: [
      { item_name: "Falafel", user: "undifined" },
      { item_name: "Labneh", user: "undifined" },
      { item_name: "Baklava", user: "undifined" },
    ],
    participants: [],
    max_participants: 10,
  },
  {
    id: 3,
    event_title: "Shared Heritage Art Exhibit",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2025-07-15",
    event_start_time: "10:00",
    location: { lat: 32.6996, lng: 35.3035, city_name: "Nazareth" },
    event_host_name: "israel litvak",
    summary: "Art pieces inspired by Jewish and Arab historical narratives.",
    description:
      "This exhibit showcases artworks created by local artists who draw from the rich tapestry of Jewish and Arab history. Visitors can view paintings, sculptures, and multimedia installations that celebrate heritage, honor traditions, and explore the interconnected pasts of our peoples.",
    contribution_list: [
      { item_name: "Tabbouleh", user: "undifined" },
      { item_name: "Sufganiyot", user: "undifined" },
      { item_name: "Halva", user: "undifined" },
    ],
    participants: [],
    max_participants: 7,
  },
  {
    id: 4,
    event_title: "Joint Storytelling Session",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2025-08-10",
    event_start_time: "14:00",
    location: { lat: 32.0132, lng: 34.7722, city_name: "Holon" },
    event_host_name: "israel litvak",
    summary:
      "A bilingual storytelling event featuring folk tales from both communities.",
    description:
      "Professional storytellers from Jewish and Arab backgrounds share classic folk tales, fables, and personal anecdotes. These stories highlight moral lessons, historical insights, and shared values, inviting listeners to discover common ground through the power of narrative.",
    contribution_list: [
      { item_name: "Malabi", user: "undifined" },
      { item_name: "Bourekas", user: "undifined" },
      { item_name: "Mujaddara", user: "undifined" },
    ],
    participants: [],
    max_participants: 5,
  },
  {
    id: 5,
    event_title: "Youth Sports for Unity",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2025-09-05",
    event_start_time: "16:00",
    location: { lat: 32.0853, lng: 34.7818, city_name: "Tel Aviv" },
    event_host_name: "israel litvak",
    summary:
      "A friendly soccer tournament with mixed teams of Jewish and Arab youth.",
    description:
      "Local youth come together to form blended teams and compete in a spirit of friendship and fairness. Through sportsmanship, cooperation, and camaraderie, this event encourages young participants to build trust, break down barriers, and lay the foundation for a more inclusive future.",
    contribution_list: [
      { item_name: "Sambusak", user: "undifined" },
      { item_name: "Challah", user: "undifined" },
      { item_name: "Stuffed Grape Leaves", user: "undifined" },
    ],
    participants: [],
    max_participants: 5,
  },
  {
    id: 6,
    event_title: "Jewish Culinary Traditions",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2025-10-12",
    event_start_time: "17:00",
    location: { lat: 32.0853, lng: 34.7818, city_name: "Tel Aviv" },
    event_host_name: "israel litvak",
    summary:
      "A celebration of traditional Jewish contribution_list and their cultural significance.",
    description:
      "Discover the rich history of Jewish cuisine through a hands-on cooking experience. Learn to prepare classic contribution_list and uncover the stories behind them, passed down through generations.",
    contribution_list: [
      { item_name: "Gefilte Fish", user: "undifined" },
      { item_name: "Matzah Ball Soup", user: "undifined" },
      { item_name: "Rugelach", user: "undifined" },
    ],
    participants: [],
    max_participants: 10,
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

saveEventsData(eventsData);
