function EventDetails({ date, eventStartTime, location }) {
    return (
      <div className="event-details-card-section">
        <div className="event-date-time">
          <div className="event-icon-and-text">
            <i className="event-icon">📅</i>
            <div className="event-date-time-text">
              <p className="event-date-time-label">Date and Time</p>
              <p className="event-date-date">
                {new Date(date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                <span className="date-span">
                  {new Date(`1970-01-01T${eventStartTime}`).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="event-address">
          <div className="event-icon-and-text">
            <i className="event-icon">📍</i>
            <div>
              <p className="adress-label">Address</p>
              <p className="address">{location.city_name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default EventDetails;
  