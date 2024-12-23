import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { db } from "../firebase/firebaseConfig";
import ContributionList from "./ContributionList";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function EventDescription() {
  const { eventId } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!location.state?.event);
  const navigate = useNavigate();
  const { user } = useUser();

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

  const handleJoinClick = async (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/sign-in", { state: { from: location.pathname } });
      return;
    }

    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        participants: arrayUnion(user.username),
      });

      setEvent((prevEvent) => ({
        ...prevEvent,
        participants: [...(prevEvent?.participants || []), user.username],
      }));
      console.log("User joined the event:", user.username);
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleUnjoinClick = async () => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        participants: arrayRemove(user.username),
      });

      setEvent((prevEvent) => ({
        ...prevEvent,
        participants: (prevEvent?.participants || []).filter(
          (participant) => participant !== user.username
        ),
      }));
      console.log("User unjoined the event:", user.username);
    } catch (error) {
      console.error("Error unjoining event:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className="description-page-container">
      <h1>{event.event_title}</h1>
      <p>{event.event_host_name}</p>
      <p className="event-description-info">{event.description}</p>
      <img
        className="event-image-description"
        src={event.imgUrl}
        alt={event.event_title}
      />
      <p>Date: {event.date}</p>
      {hasJoined ? (
        <button onClick={handleUnjoinClick}>Unjoin Event</button>
      ) : (
        <button onClick={handleJoinClick}>Join Event</button>
      )}
      {hasJoined && (
        <div className="event-contribution-list">
          <ContributionList
            eventDocId={String(event.id)}
            contributionList={event.contribution_list || []}
            setEvent={setEvent}
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
    </div>
  );
}

export default EventDescription;
