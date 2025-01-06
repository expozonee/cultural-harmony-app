import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useUserData } from "../context/UserContext";
import ContributionList from "./ContributionList";
import { Link} from "react-router";
import Poll from "./Poll";
import { useEvents } from "../context/EventsContext";
import usePageLeave from "../hooks/usePageLeave";
import Popup from "./Popup/Popup";
import CreatePoll from "./CreatePoll";

function EventDescription() {
  const { eventId } = useParams();
  const { userData, unJoinEvents, joinEvent } = useUserData();
  const { getEventById } = useEvents();
  const location = useLocation();

  const [event, setEvent] = useState(undefined);
  const [loading, setLoading] = useState(!location.state?.event);
  const [popup, setPopup] = useState(null);
  const [showCreatePoll, setShowCreatePoll] = useState(false);


  const hasJoined = event?.participants?.includes(userData?.email);
  const hasPickedItem = event?.contribution_list.some(
    (contribution) => contribution.user === userData?.email
  );
  const IsHost = event?.host_email_address === userData?.email;

  const handleJoin = async () => {
    await joinEvent(eventId);
    setPopup({
      message: "Please pick an item to bring to the event.",
      buttons: [{ text: "Close", onClick: () => setPopup(null) }]
    });
  };

  const handleUnJoinButton = async () => {
    setPopup({
      message: "Are you sure you want to unjoin this event?",
      buttons: [
        {
          text: "Yes",
          onClick: async () => {
            await unJoinEvents([eventId]);
            setPopup(null); 
          }
        },
        {
          text: "No",
          onClick: () => setPopup(null)
        }
      ]
    });
  };

  usePageLeave(hasJoined, hasPickedItem,IsHost, setPopup, eventId, unJoinEvents);

  console.log("popup", popup);

  useEffect(() => {
    async function getEvent() {
      try {
        setLoading(true);
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getEvent();
  }, [eventId, getEventById]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className="description-page-container">
      {event.imgUrl ? (
        <img
          className="event-image-description"
          src={event.imgUrl}
          alt={event.event_title}
          onError={(e) => {
            e.target.remove();
            const card = document.querySelector(".event-description-card");
            if (card) card.classList.add("no-image");
          }}
        />
      ) : null}
      {popup && <Popup message={popup.message} buttons={popup.buttons} onClose={() => setPopup(null)} />}
      <div className="event-description-card">
        <div className="event-description-card-left">
          <h1>{event.event_title}</h1>
          <div className="event-date-time">
            <div className="event-icon-and-text">
              <i className="event-icon">📅</i>
              <div>
                <p className="label">Date and Time</p>
                <p className="date">
                  {new Date(event.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  <span>
                    {new Date(
                      `1970-01-01T${event.event_start_time}`
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
                <p className="address">{event.location.city_name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="event-description-card-right">
          <div className="event-organizer">
            <i className="organizer-icon">👤</i>
            <p className="host-name">
              Organized By: <span>{event.event_host_name}</span>
            </p>
          </div>
          {hasJoined ? (
            <button className="unjoin-button" onClick={handleUnJoinButton}>
              Unjoin Event
            </button>
          ) : (
            <button className="join-button" onClick={handleJoin}>
              Join Event
            </button>
          )}
          {userData?.email === event.host_email_address && (
            <Link to={`/events/${eventId}/update-event`}>
              <button className="update-event-button">Update Event</button>
            </Link>
          )}
        </div>
      </div>
      <div className="event-description-container">
        <div className="event-description-container-left">
          <div className="event-description-content">
            <h2>Event Description</h2>
            <p className="event-description-info">{event.description}</p>
          </div>
          <div className="event-card-polls">
              {hasJoined && event.polls ? (
                event.polls.map((poll, index) => {
              return <Poll key={index} poll={poll} />;
              })) :
              ( 
              <p>No poll available for this event.</p>
              )}
          </div>
        </div>
        <div className="event-description-container-right">
          <div className="event-participants-list">
            <h2>Participants</h2>
            <ul>
              {event.participants?.map((participant) => (
                <li key={participant}>{participant}</li>
              ))}
            </ul>
          </div>
          {hasJoined && (
            <div className="event-contribution-list">
              <ContributionList eventId={eventId} eventData={event} />
            </div>
          )}
          {event.host_email_address === userData?.email && (
          <>
            {!showCreatePoll ? (
              <button className="create-new-poll-button" onClick={() => setShowCreatePoll(true)}>
                Create A Poll for This Event
              </button>
            ) : (
                <div className="create-poll-container">
                  <CreatePoll onClose={() => setShowCreatePoll(false)} />
                </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default EventDescription;
