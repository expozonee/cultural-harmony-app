import EventPreview from "./EventPreview";
import { GoogleMapList } from "./Google_maps/GoogleMapList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useEvents } from "../context/EventsContext";

function EventsList() {
  const { events } = useEvents();
  console.log("🚀 ~  events:", events);

  const [previewMap, setPreviewMap] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <>
      <button
        className="show-map-btn"
        onClick={() => setPreviewMap(!previewMap)}
      >
        {previewMap ? "Show List" : "Show Map"}{" "}
        <i className={`fa-solid ${previewMap ? "fa-list" : "fa-map"}`}></i>
      </button>
      {isSignedIn && (
        <Link to="/events/add-event">
          <button className="add-event">Add Event</button>
        </Link>
      )}
      {previewMap ? (
        <GoogleMapList events={events} />
      ) : (
        <ul className="events-list">
          {events &&
            events.map((event) => (
              <li className="event-preview" key={event.id}>
                <EventPreview event={event} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
export default EventsList;
