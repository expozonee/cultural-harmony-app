import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useUserData } from "../context/UserContext";
import { useEvents } from "../context/EventsContext";
import usePageLeave from "../hooks/usePageLeave";
import Popup from "./Popup/Popup";
import EventImage from "./EventDescription/EventImage";
import EventDetails from "./EventDescription/EventDetails";
import EventOrganizer from "./EventDescription/EventOrganizer";
import JoinUnjoinButton from "./EventDescription/JoinUnjoinButton";
import PollSection from "./EventDescription/PollSection";
import ContributionListSection from "./EventDescription/ContributionListSection";
import CreatePollButton from "./EventDescription/CreatePollButton";

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

  usePageLeave(hasJoined, hasPickedItem, IsHost, setPopup, eventId, unJoinEvents);

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
      <EventImage imgUrl={event.imgUrl} eventTitle={event.event_title} />
      {popup && <Popup message={popup.message} buttons={popup.buttons} onClose={() => setPopup(null)} />}
      <div className="event-description-card">
        <div className="event-description-card-left">
          <h1>{event.event_title}</h1>
          <EventDetails 
            date={event.date}
            eventStartTime={event.event_start_time}
            location={event.location}
          />
        </div>
        <div className="event-description-card-right">
          <EventOrganizer 
            hostName={event.event_host_name}
            hostEmailAddress={event.host_email_address}
            currentUserEmail={userData?.email}
          />
          <JoinUnjoinButton 
            hasJoined={hasJoined}
            onJoin={handleJoin}
            onUnJoin={handleUnJoinButton}
          />
        </div>
      </div>
      <div className="event-description-container">
        <div className="event-description-container-left">
          <div className="event-description-content">
            <h2>Event Description</h2>
            <p className="event-description-info">{event.description}</p>
          </div>
          <PollSection hasJoined={hasJoined} polls={event.polls} />
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
          <ContributionListSection eventId={eventId} event={event} hasJoined={hasJoined} />
          {event.host_email_address === userData?.email && (
            <CreatePollButton 
              showCreatePoll={showCreatePoll} 
              setShowCreatePoll={setShowCreatePoll} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDescription;
