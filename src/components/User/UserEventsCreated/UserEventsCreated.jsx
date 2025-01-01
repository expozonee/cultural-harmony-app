import { useEffect, useState } from "react";
import { useUserData } from "../../../context/UserContext";
import UserCreatedEventData from "./UserCreatedEventData";
import { useEvents } from "../../../context/EventsContext";

export default function UserEventsCreated() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const { getUserCreatedEvents } = useUserData();
  const { deleteEvent } = useEvents();
  const [checkedIndices, setCheckedIndices] = useState([]);

  useEffect(() => {
    async function getCreatedEvents() {
      const createdEvents = await getUserCreatedEvents();
      setCreatedEvents(createdEvents);
    }

    getCreatedEvents();
  }, [getUserCreatedEvents]);

  const handleCheckboxChange = (index) => {
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      {createdEvents && createdEvents.length > 0 ? (
        <>
          <table className="table-event" border="1">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Host</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {createdEvents.map((e, index) => (
                <UserCreatedEventData
                  key={index}
                  data={e}
                  index={index}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              deleteEvent(
                checkedIndices.map((index) => {
                  return createdEvents[index].id;
                })
              );
              setCheckedIndices([]);
            }}
          >
            Delete Selected
          </button>
        </>
      ) : (
        <p>You did not create any events yet!</p>
      )}
    </div>
  );
}
