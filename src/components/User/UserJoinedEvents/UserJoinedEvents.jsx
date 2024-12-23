import { useEffect, useState } from "react";
import { useUserData } from "../../../context/UserContext";

export default function UserJoinedEvents() {
  const { getUserJoinedEvents, unJoinEvent } = useUserData();
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    async function getJoinedEvents() {
      const joinedEvents = await getUserJoinedEvents();

      setJoinedEvents(joinedEvents);
    }

    getJoinedEvents();
  }, [getUserJoinedEvents]);

  return (
    <div>
      {joinedEvents && joinedEvents.length > 0 ? (
        joinedEvents.map((e, i) => {
          return (
            <div key={i}>
              <p>Event: {e.event_title}</p>
              <button onClick={() => unJoinEvent(e.id)}>Unjoin Event</button>
            </div>
          );
        })
      ) : (
        <p>You did not join any events yet!</p>
      )}
    </div>
  );
}
