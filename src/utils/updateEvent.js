import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const updateContributionList = async ({
  index,
  list,
  currentUserName,
  eventDocId,
  isUnselect,
}) => {
  const updatedList = list.map((item, i) => {
    if (i === index) {
      return isUnselect
        ? { ...item, user: "" }
        : { ...item, user: currentUserName };
    }
    return item;
  });

  try {
    const eventRef = doc(db, "events", eventDocId);
    await updateDoc(eventRef, { contribution_list: updatedList });
    return updatedList;
  } catch (error) {
    console.error("Error updating contribution list: ", error);
    throw error;
  }
};

export const updateEventParticipants = async (
  db,
  eventId,
  username,
  action
) => {
  const eventRef = doc(db, "events", eventId);
  const update =
    action === "join"
      ? { participants: arrayUnion(username) }
      : { participants: arrayRemove(username) };

  try {
    await updateDoc(eventRef, update);

    if (action === "unjoin") {
      console.log("Updating contribution list for unjoin action");
      const eventDoc = await getDoc(eventRef);

      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        const contributionList = eventData.contribution_list;

        const updatedContributionList = contributionList.map((item) =>
          item.user === username ? { ...item, user: "undefined" } : item
        );

        await updateDoc(eventRef, {
          contribution_list: updatedContributionList,
        });
      } else {
        console.error("Event document does not exist!");
      }
    }

    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      return [eventDoc.data().participants, eventDoc.data().contribution_list];
    } else {
      console.error("Event document does not exist after update!");
      return [];
    }
  } catch (error) {
    console.error(`Error updating participants: ${error}`);
    throw error;
  }
};
