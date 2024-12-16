function EventPreview({ event }) {
  return (
    <div className="event-card">
      <h1>{event.event_title}</h1>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.host}</p>
      <p>{event.summary}</p>
      <p>{event.description}</p>
    </div>
  );
}
export default EventPreview;
