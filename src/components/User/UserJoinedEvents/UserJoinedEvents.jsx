import { useEffect, useState } from "react";
import { useUserData } from "../../../context/UserContext";
import UserJoinedEventData from "./UserJoinedEventData";

export default function UserJoinedEvents() {
  const { getUserJoinedEvents, unJoinEvents } = useUserData();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [checkedIndices, setCheckedIndices] = useState([]);

  useEffect(() => {
    async function getJoinedEvents() {
      const joinedEvents = await getUserJoinedEvents();
      setJoinedEvents(joinedEvents);
    }

    getJoinedEvents();
  }, [getUserJoinedEvents]);

  const handleCheckboxChange = (index) => {
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      {joinedEvents && joinedEvents.length > 0 ? (
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
              {joinedEvents.map((e, index) => (
                <UserJoinedEventData
                  key={index}
                  index={index}
                  onCheckboxChange={handleCheckboxChange}
                  data={e}
                />
              ))}
            </tbody>
          </table>
          <button
            onClick={() =>
              unJoinEvents(
                checkedIndices.map((index) => joinedEvents[index].id)
              )
            }
          >
            Delete Selected
          </button>
        </>
      ) : (
        <p>You did not join any events yet!</p>
      )}
    </>
  );
}
