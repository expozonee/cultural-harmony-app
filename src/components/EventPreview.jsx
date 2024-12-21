import { Link } from "react-router";
import { useUserData } from "../context/UserContext";
// todo: url builder for links
function EventPreview({ event }) {
  const { joinEvent } = useUserData();

  return (
    <div className="event-preview-card">
      <div className="event-image">
        <img src={event.imgUrl} alt={event.event_title} />
      </div>

      <div className="event-date">
        <span className="event-month">{event.date}</span>
      </div>

      <div className="event-details">
        <h2 className="event-title">{event.event_title}</h2>
        <p className="event-description">{event.summary}</p>
        <Link
          to={`/events/${event.id}`}
          state={{ event }}
          className="join-button"
          onClick={() => joinEvent(event.id)}
        >
          Join event
        </Link>
      </div>
    </div>
  );
}
export default EventPreview;
