import EventPreview from "./EventPreview";
import { useLoaderData } from "react-router";
import { GoogleMapList } from "./Google_maps/GoogleMapList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

function EventsList() {
  const events = useLoaderData();
  const [previewMap, setPreviewMap] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <>
      <h1 className="event-list-title">Upcoming Events</h1>
      <button
        className="show-map-btn"
        onClick={() => setPreviewMap(!previewMap)}
      >
        {previewMap ? "Show List" : "Show Map"}{" "}
        <i className={`fa-solid ${previewMap ? "fa-list" : "fa-map"}`}></i>
      </button>
      {isSignedIn && (
        <Link to="/events/add-event">
          <button className="">Add Event</button>
        </Link>
      )}
      {previewMap ? (
        <GoogleMapList events={events} />
      ) : (
        <ul className="events-list">
          {events.map((event) => (
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
