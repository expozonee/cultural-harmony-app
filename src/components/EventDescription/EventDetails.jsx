function EventDetails({ date, eventStartTime, location }) {
    return (
      <div>
        <div className="event-date-time">
          <div className="event-icon-and-text">
            <i className="event-icon">📅</i>
            <div>
              <p className="label">Date and Time</p>
              <p className="date">
                {new Date(date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                <span>
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
              <p className="label">Address</p>
              <p className="address">{location.city_name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default EventDetails;
  