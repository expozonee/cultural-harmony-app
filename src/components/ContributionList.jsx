import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import CreatePoll from "./CreatePoll";

function ContributionList({ contributionList, eventDocId }) {
  console.log("Received eventDocId:", eventDocId);
  console.log("Received contributionList:", contributionList);

  const [list, setList] = useState(contributionList || []);
  const { user } = useUser();

  const currentUserName = user?.username;

  useEffect(() => {
    const fetchContributionList = async () => {
      try {
        const eventRef = doc(db, "events", eventDocId);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          setList(eventData.contribution_list || []);
        } else {
          console.error("Event document not found!");
        }
      } catch (error) {
        console.error("Error fetching contribution list:", error);
      }
    };

    if (eventDocId) {
      fetchContributionList();
    }
  }, [eventDocId]);

  const handleCheckboxChange = async (index) => {
    const updatedList = list.map((item, i) => {
      if (i === index && item.user !== currentUserName) {
        return { ...item, user: currentUserName };
      }
      return item;
    });

    console.log("Updated list:", updatedList);

    try {
      const eventRef = doc(db, "events", eventDocId);
      await updateDoc(eventRef, { contribution_list: updatedList });
      setList(updatedList);
    } catch (error) {
      console.error("Error updating contribution list: ", error);
    }
  };

  const handleUnselect = async (index) => {
    const updatedList = list.map((item, i) => {
      if (i === index && item.user === currentUserName) {
        return { ...item, user: "undifined" };
      }
      return item;
    });

    try {
      const eventRef = doc(db, "events", eventDocId);
      await updateDoc(eventRef, { contribution_list: updatedList });
      setList(updatedList);
    } catch (error) {
      console.error("Error unselecting item: ", error);
    }
  };

  return (
    <div className="contribution-list">
      <h3>Contribution List</h3>
      <ul>
        {list.map((item, index) => {
          const isPickedByCurrentUser = item.user === currentUserName;
          const isPickedByOtherUser =
            item.user !== "undifined" && !isPickedByCurrentUser;

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
                  disabled={isPickedByOtherUser || isPickedByCurrentUser}
                  onChange={() => handleCheckboxChange(index)}
                />
                {item.item_name}
              </label>
              {isPickedByCurrentUser && (
                <button
                  className="picked"
                  onClick={() => handleUnselect(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Unselect
                </button>
              )}
              {isPickedByOtherUser && <span> (Picked by {item.user})</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContributionList;
