function EventOrganizer({ hostName}) {
  return (
    <div className="event-organizer">
      <div className="event-organizer-info">
        <p className="host-name">
          <i className="organizer-icon">👤</i> Organized By:{" "}
          <span className="host-name-span">{hostName}</span>
        </p>
      </div>
    </div>
  );
}

export default EventOrganizer;
