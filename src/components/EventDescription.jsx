import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useUserData } from "../context/UserContext";
import ContributionList from "./ContributionList";
import { Link, Outlet } from "react-router";
import Poll from "./Poll";
import { useEvents } from "../context/EventsContext";

function EventDescription() {
  const { eventId } = useParams();
  const { userData, unJoinEvents, joinEvent } = useUserData();
  const { getEvenyById } = useEvents();
  const currentEmail = userData?.email;

  const location = useLocation();
  const [event, setEvent] = useState(undefined);
  const [loading, setLoading] = useState(!location.state?.event);

  const hasJoined = event?.participants?.includes(userData?.email);

  useEffect(() => {
    // const fetchEvent = async () => {
    //   if (!event) {
    //     try {
    //       const docRef = doc(db, "events", eventId);
    //       const docSnap = await getDoc(docRef);

    //       if (docSnap.exists()) {
    //         const eventData = { id: docSnap.id, ...docSnap.data() };
    //         setEvent(eventData);
    //         console.log("Fetched event:", eventData);
    //       } else {
    //         console.error("Event not found");
    //       }
    //     } catch (error) {
    //       console.error("Error fetching event from Firestore:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    // };

    async function getEvent() {
      try {
        setLoading(true);
        const eventData = await getEvenyById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getEvent();
  }, [eventId, getEvenyById]);

  // const handleParticipantAction = async (action) => {
  //   if (!user) {
  //     navigate("/sign-in", { state: { from: location.pathname } });
  //     return;
  //   }

  //   try {
  //     const update = await updateEventParticipants(
  //       db,
  //       eventId,
  //       user.username,
  //       action
  //     );
  //     const updatedParticipants = update[0];
  //     const updatedContributionList = update[1];

  //     setEvent((prevEvent) => ({
  //       ...prevEvent,
  //       participants: updatedParticipants,
  //       contribution_list: updatedContributionList,
  //     }));

  //     console.log(
  //       `User ${action === "join" ? "joined" : "unjoined"} the event:`,
  //       user.username
  //     );
  //   } catch (error) {
  //     console.error(
  //       `Error ${action === "join" ? "joining" : "unjoining"} event:`,
  //       error
  //     );
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className="description-page-container">
      <h1>{event.event_title}</h1>
      <p className="host-name">
        Organized By: <span>{event.event_host_name}</span>
      </p>
      <p className="event-description-info">{event.description}</p>
      <img
        className="event-image-description"
        src={event.imgUrl}
        alt={event.event_title}
      />
      <p>Date: {event.date}</p>
      <p>Location: {event.location.city_name}</p>
      {currentEmail === event.host_email_address && (
        <Link to={`/events/${event.id}/update-event?from=event`}>
          <button>Edit Event</button>
        </Link>
      )}
      <p className="event--date"> Date: {event.date}</p>
      {hasJoined ? (
        <button
          className="unjoin-button"
          onClick={() => unJoinEvents([eventId])}
        >
          Unjoin Event
        </button>
      ) : (
        <button className="join-button" onClick={() => joinEvent(eventId)}>
          Join Event
        </button>
      )}
      {hasJoined && (
        <div className="event-contribution-list">
          <ContributionList
            eventId={eventId}
            contributionList={event.contribution_list || []}
            setEvent={setEvent}
            eventData={event}
          />
        </div>
      )}
      {hasJoined && (
        <div className="event-participants-list">
          <h2>Participants</h2>
          <ul>
            {event.participants?.map((participant) => (
              <li key={participant}>{participant}</li>
            ))}
          </ul>
        </div>
      )}

      {event.event_host_name === userData?.email ? (
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
