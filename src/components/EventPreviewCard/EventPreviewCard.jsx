import "./EventPreviewCard.css";

const EventPreviewCard = ({ imageUrl, month, day, title, description }) => {
  return (
    <div className="event-preview-card">
      <div className="event-image">
        <img src={imageUrl} alt="Event" />
      </div>

      <div className="event-date">
        <span className="event-month">{month}</span>
        <span className="event-day">{day}</span>
      </div>

      <div className="event-details">
        <h2 className="event-title">{title}</h2>
        <p className="event-description">{description}</p>
        <button className="join-button">Join event</button>
      </div>
    </div>
  );
};

export default EventPreviewCard