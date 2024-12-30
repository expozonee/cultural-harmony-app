import { Link, useLocation } from "react-router-dom";

function EventPreview({ event }) {
  const [year, month, day] = event.date.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const location = useLocation();
  console.log("location", location);
  const isHomePage = location.pathname === "/";
  console.log("isHomePage", isHomePage);
  

  return (
    <div className={isHomePage? "event-preview-card-home" :"event-preview-card"}>
      <div className={isHomePage? "event-image-home": "event-image"}>
        <img src={event.imgUrl} alt={event.event_title} />
        <div className="event-date">
          <span className="event-month">{monthNames[parseInt(month) - 1]}</span>
          <span className="event-day">{day}</span>
        </div>
      </div>
      <div className={isHomePage? "event-content-home": "event-content"}>
        <h2 className="event-title">{event.event_title}</h2>
        <p className="event-description">{event.summary}</p>
        <Link
          to={`/events/${event.id}`}
          state={{ event }}
          className="details-button"
        >
          More Details
        </Link>
      </div>
    </div>
  );
}

export default EventPreview;
