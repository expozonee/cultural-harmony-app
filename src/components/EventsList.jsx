import EventPreview from "./EventPreview";
import { useLoaderData } from "react-router";
import { GoogleMapList } from "./Google_maps/GoogleMapList";
import { useState } from "react";

function EventsList() {
  const events = useLoaderData();
  const [previewMap, setPreviewMap] = useState(false);

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
