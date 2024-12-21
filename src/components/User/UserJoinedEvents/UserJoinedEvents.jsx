import { useEffect, useState } from "react";
import { useUserData } from "../../../context/UserContext";

export default function UserJoinedEvents() {
  const { getUserJoinedEvents } = useUserData();
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
      {joinedEvents.length > 0 ? (
        joinedEvents.map((e) => <p key={e.id}>Event: {e.event_title}</p>)
      ) : (
        <p>You did not join any events yet!</p>
      )}
    </div>
  );
}
