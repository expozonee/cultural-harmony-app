import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useUserData } from "../../context/UserContext";
import { useEvents } from "../../context/EventsContext";
import usePageLeave from "../../hooks/usePageLeave";
import Popup from "../../components/Popup/Popup";
import EventImage from "../../components/EventDescription/EventImage";
import EventDetails from "../../components/EventDescription/EventDetails";
import EventOrganizer from "../../components/EventDescription/EventOrganizer";
import JoinUnjoinButton from "../../components/EventDescription/JoinUnjoinButton";
import PollSection from "../../components/EventDescription/PollSection";
import ContributionListSection from "../../components/EventDescription/ContributionListSection";
import CreatePollButton from "../../components/EventDescription/CreatePollButton";
import ParticipantsList from "../../components/EventDescription/ParticipantsList";

function EventDescription() {
  const location = useLocation();
  const { eventId } = useParams();
  const { getEventById } = useEvents();
  const [event, setEvent] = useState(undefined);
  const { userData, unJoinEvents, joinEvent } = useUserData();
  const [loading, setLoading] = useState(!location.state?.event);
  const [popup, setPopup] = useState(null);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const hasJoined = event?.participants?.includes(userData?.email);

  const hasPickedItem = event?.contribution_list.some(
    (contribution) => contribution.user === userData?.email
  );

  const IsHost = event?.host_email_address === userData?.email;

  const handleJoin = async () => {
    await joinEvent(eventId);
    setPopup({
      message: "Please pick an item to bring to the event.",
      buttons: [{ text: "Close", onClick: () => setPopup(null) }],
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
          },
        },
        {
          text: "No",
          onClick: () => setPopup(null),
        },
      ],
    });
  };

  usePageLeave(
    hasJoined,
    hasPickedItem,
    IsHost,
    setPopup,
    eventId,
    unJoinEvents
  );

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const eventData = getEventById(eventId);

      setEvent(eventData);

      if (eventData) {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, getEventById]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="description-page-container">
      <EventImage imgUrl={event.imgUrl} eventTitle={event.event_title} />
      {popup && (
        <Popup
          message={popup.message}
          buttons={popup.buttons}
          onClose={() => setPopup(null)}
        />
      )}
      <div className="event-description-card">
        <div className="event-description-card-left">
          <h1 className="event-title-description-card">{event.event_title}</h1>
          <EventDetails
            date={event.date}
            eventStartTime={event.event_start_time}
            location={event.location}
          />
        </div>
        <div className="event-description-card-right">
          <EventOrganizer
            hostName={event.event_host_name}
          />
          <div className="event-buttons-chatbot">
            <JoinUnjoinButton
              hasJoined={hasJoined}
              onJoin={handleJoin}
              onUnJoin={handleUnJoinButton}
              hostEmailAddress={event.host_email_address}
              currentUserEmail={userData?.email}
              event={event}
              isChatbotVisible={isChatbotVisible}
              toggleChatbot={toggleChatbot}
            />
          </div>
        </div>
      </div>
      <div className="event-description-container">
        <div className="event-description-container-left">
          <div className="event-description-content">
            <h2 className="event-description-header">Event Description</h2>
            <p className="event-description-info">{event.description}</p>
          </div>
          <PollSection hasJoined={hasJoined} polls={event.polls} />
        </div>
        <div className="event-description-container-right">
          <ParticipantsList event={event} />
          <ContributionListSection
            eventId={eventId}
            event={event}
            hasJoined={hasJoined}
          />
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
