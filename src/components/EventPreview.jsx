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

//   return (
//     <div className="event-preview-card">
//       <div className="event-image">
//         <img src={imageUrl} alt="Event" />
//       </div>

//       <div className="event-date">
//         <span className="event-month">{month}</span>
//         <span className="event-day">{day}</span>
//       </div>

//       <div className="event-details">
//         <h2 className="event-title">{title}</h2>
//         <p className="event-description">{description}</p>
//         <button className="join-button">Join event</button>
//       </div>
//     </div>
//   );
// };
