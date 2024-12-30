import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { db } from "../firebase/firebaseConfig";
import ContributionList from "./ContributionList";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { updateEventParticipants } from "../utils/updateEvent";
import { Link, Outlet } from "react-router";
import Poll from "./Poll";

function EventDescription() {
  const { eventId } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!location.state?.event);
  const navigate = useNavigate();
  const { user } = useUser();

  console.log("Event:", event);
  const hasJoined = event?.participants?.includes(user?.username);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!event) {
        try {
          const docRef = doc(db, "events", eventId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const eventData = { id: docSnap.id, ...docSnap.data() };
            setEvent(eventData);
            console.log("Fetched event:", eventData);
          } else {
            console.error("Event not found");
          }
        } catch (error) {
          console.error("Error fetching event from Firestore:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [event, eventId]);

  const handleParticipantAction = async (action) => {
    if (!user) {
      navigate("/sign-in", { state: { from: location.pathname } });
      return;
    }

    try {
      const update = await updateEventParticipants(
        db,
        eventId,
        user.username,
        action
      );
      const updatedParticipants = update[0];
      const updatedContributionList = update[1];

      setEvent((prevEvent) => ({
        ...prevEvent,
        participants: updatedParticipants,
        contribution_list: updatedContributionList,
      }));

      console.log(
        `User ${action === "join" ? "joined" : "unjoined"} the event:`,
        user.username
      );
    } catch (error) {
      console.error(
        `Error ${action === "join" ? "joining" : "unjoining"} event:`,
        error
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className="description-page-container">
      <img className="event-image-description" src={event.imgUrl} alt={event.event_title}/>
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
                    {new Date(`1970-01-01T${event.event_start_time}`).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit" }
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
            <button
              className="unjoin-button"
              onClick={() => handleParticipantAction("unjoin")}
            >
              Unjoin Event
            </button>
          ) : (
            <button
              className="join-button"
              onClick={() => handleParticipantAction("join")}
            >
              Join Event
            </button>
          )}
        </div>
      </div>
      <div className="event-description-container">
        <div className="event-description-container-left">
          <h2>Event Description</h2>
          <p className="event-description-info">{event.description}</p>
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
              <ContributionList
                eventDocId={String(event.id)}
                contributionList={event.contribution_list || []}
                setEvent={setEvent}
              />
            </div>
          )}
        </div>
      </div>
      {event.event_host_name === user?.username ? (
        <Link to={`create-poll`}>
          <button>Create A Poll for This Event</button>
        </Link>
      ) : event.poll ? (
        <Poll poll={event.poll} />
      ) : (
        <p>No poll available for this event.</p>
      )}
      <Outlet />
    </div>
  );
}

export default EventDescription;
