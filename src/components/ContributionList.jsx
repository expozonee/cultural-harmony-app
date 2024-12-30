import { useUserData } from "../context/UserContext";
import { useEvents } from "../context/EventsContext";

function ContributionList({ eventId, eventData }) {
  const { updateEvent } = useEvents();
  const { userData } = useUserData();
  // eslint-disable-next-line no-unused-vars
  const { id, ...data } = eventData;

  const currentUserEmail = userData?.email;

  const handleCheckboxChange = async (index) => {
    const newData = {
      ...data,
      contribution_list: data.contribution_list.map((c, i) => {
        if (index !== i) return c;
        return {
          item_name: c.item_name,
          user: c.user ? "" : currentUserEmail,
        };
      }),
    };

    await updateEvent(eventId, newData);
  };

  const hasSelectedItem = eventData.contribution_list.some(
    (item) => item.user === currentUserEmail
  );

  return (
    <div className="contribution-list">
      <h3>Contribution List</h3>
      <ul>
        {eventData.contribution_list.map((item, index) => {
          const isPickedByCurrentUser = item.user === currentUserEmail;
          const isPickedByOtherUser =
            item.user !== "" && !isPickedByCurrentUser;

          return (
            <li key={item.item_name}>
              <label
                style={{
                  textDecoration: isPickedByOtherUser ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={isPickedByCurrentUser}
                  disabled={
                    isPickedByOtherUser ||
                    (hasSelectedItem && !isPickedByCurrentUser)
                  }
                  onChange={() => handleCheckboxChange(index)}
                />
                {item.item_name}
              </label>
              {isPickedByOtherUser && <span> (Picked by {item.user})</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContributionList;
