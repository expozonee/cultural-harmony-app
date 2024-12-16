import { useEffect, useState } from "react";
import EventPreview from "./EventPreview";

function EventsList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("/public/data/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => {
        console.error("Error fetching event: ", error);
      });
  }, []);

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
