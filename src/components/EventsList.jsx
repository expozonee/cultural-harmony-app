import EventPreview from "./EventPreview";
import { useLoaderData } from "react-router";

function EventsList() {
  const events = useLoaderData();

  return (
    <>
      <h1 className="event-list-title">Upcoming Events</h1>
      <ul className="events-list">
        {events.map((event) => (
          <li className="event-preview" key={event.id}>
            <div>
              <EventPreview event={event} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsList;
