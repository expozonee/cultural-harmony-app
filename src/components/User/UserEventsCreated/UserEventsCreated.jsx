import { useUserData } from "../../../context/UserContext";
import UserCreatedEventData from "./UserCreatedEventData";

export default function UserEventsCreated() {
  const { getUserCreatedEvents } = useUserData();
  const createdEvents = getUserCreatedEvents();

  return (
    <div>
      {createdEvents.length > 0 ? (
        <>
          <table className="table-event" border="1">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Host</th>
              </tr>
            </thead>
            <tbody>
              {createdEvents.map((e, index) => (
                <UserCreatedEventData key={index} data={e} />
              ))}
            </tbody>
          </table>
          <button>Delete Selected</button>
        </>
      ) : (
        <p>You did not create any events yet!</p>
      )}
    </div>
  );
}
