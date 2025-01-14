import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function EventPreview({ event }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const handleJoinClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/sign-in", { state: { from: location } });
    }
  };

  const [, month, day] = event.date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const isHomePage = location.pathname === "/";

  return (
    <div
      className={isHomePage ? "event-preview-card-home" : "event-preview-card"}
    >
      <div className={isHomePage ? "event-image-home" : "event-image"}>
        <img src={event.imgUrl} alt={event.event_title} />
        <div className="event-date">
          <span className="event-month">{monthNames[parseInt(month) - 1]}</span>
          <span className="event-day">{day}</span>
        </div>
      </div>
      <div className={isHomePage ? "event-content-home" : "event-content"}>
        <h2 className="event-title">{event.event_title}</h2>
        <p className="event-description">{event.summary}</p>
        <Link
          to={`/events/${event.id}`}
          state={{ event }}
          className="details-button"
          onClick={(e) => handleJoinClick(e)}
        >
          More Details
        </Link>
      </div>
    </div>
  );
}

export default EventPreview;
