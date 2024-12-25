import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { updateContributionList } from "../utils/updateEvent";
import CreatePoll from "./CreatePoll";

function ContributionList({ contributionList, eventDocId, setEvent }) {
  const [list, setList] = useState(contributionList || []);
  const { user } = useUser();
  const currentUserName = user?.username;

  const handleCheckboxChange = async (index) => {
    const isUnselect = list[index].user === currentUserName;

    try {
      const updatedList = await updateContributionList({
        index,
        list,
        currentUserName,
        eventDocId,
        isUnselect,
      });
      setList(updatedList);
      setEvent((event) => ({
        ...event,
        contribution_list: updatedList,
      }));
    } catch (error) {
      console.error("Error handling checkbox change: ", error);
    }
  };

  const hasSelectedItem = list.some((item) => item.user === currentUserName);

  return (
    <div className="contribution-list">
      <h3>Contribution List</h3>
      <ul>
        {list.map((item, index) => {
          const isPickedByCurrentUser = item.user === currentUserName;
          const isPickedByOtherUser =
            item.user !== "undefined" && !isPickedByCurrentUser;

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
