import { useUserData } from "../../../context/UserContext";

export default function UserEventsCreated() {
  const { getUserCreatedEvents } = useUserData();
  const createdEvents = getUserCreatedEvents();

  return (
    <div>
      {createdEvents.length > 0 ? (
        createdEvents.map((e) => <p key={e.id}>Created Event: {e.id}</p>)
      ) : (
        <p>You did not create any events yet!</p>
      )}
    </div>
  );
}
