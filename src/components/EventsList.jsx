import { useEffect, useState } from "react";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import EventPreview from "./EventPreview";

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const queryEventsDB = await getDocs(collection(db, "events"));
        console.log("query snapshot: ", queryEventsDB);

        const eventsData = QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventsData.data);
      } catch (error) {
        console.log("Error fetching data from firestore: ", error);
      }
    };

    fetchEvents();
  }, []);

  // useEffect(() => {
  //   fetch("/public/data/events.json")
  //     .then((response) => response.json())
  //     .then((data) => setEvents(data))
  //     .catch((error) => {
  //       console.error("Error fetching event: ", error);
  //     });
  // }, []);

  return (
    <>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id}>
            <EventPreview event={event} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default EventsList;
