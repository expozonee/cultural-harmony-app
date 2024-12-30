import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { updateContributionList } from "../utils/updateEvent";

function ContributionList({ contributionList, eventDocId, setEvent }) {
  const [list, setList] = useState(contributionList || []);
  const [newItem, setNewItem] = useState(""); 
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

  const handleItemAction = async (action, index = null, itemName = "") => {
    try {
      let updatedList;

      if (action === "add" && itemName.trim()) {
        updatedList = [...list, { item_name: itemName.trim(), user: currentUserName }];
      } else if (action === "delete" && index !== null) {
        updatedList = list.filter((_, i) => i !== index);
      } else {
        return;
      }

      await updateContributionList({
        list: updatedList,
        eventDocId,
      });

      setList(updatedList);
      setEvent((event) => ({
        ...event,
        contribution_list: updatedList,
      }));

      if (action === "add") setNewItem(""); 
    } catch (error) {
      console.error(`Error handling item action (${action}): `, error);
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
            item.user !== ""  && !isPickedByCurrentUser;

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
              {isPickedByCurrentUser && (
                <button
                  className="delete-item-btn"
                  onClick={() => handleItemAction("delete", index)}
                >
                  Delete
                </button>
              )}
              {isPickedByOtherUser && <span> (Picked by {item.user})</span>}
            </li>
          );
        })}
      </ul>
      {!hasSelectedItem && (
        <div className="add-item">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter an item"
          />
          <button className="add-item-btn"  onClick={() => handleItemAction("add", null, newItem)} disabled={!newItem.trim()}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default ContributionList;
