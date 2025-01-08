import { Link } from "react-router-dom";
function EventOrganizer({ hostName, hostEmailAddress, currentUserEmail }) {
  return (
    <div className="event-organizer">
      <div className="event-organizer-info">
        <p className="host-name">
          <i className="organizer-icon">👤</i> Organized By:{" "}
          <span className="host-name-span">{hostName}</span>
        </p>
      </div>

      {hostEmailAddress === currentUserEmail && (
        <>
          <Link to={`/events/${hostEmailAddress}/update-event`}>
            <button className="update-event-button">Update Event</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default EventOrganizer;
