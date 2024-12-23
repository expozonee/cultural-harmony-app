import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const updateContributionList = async ({ 
    index, 
    list, 
    currentUserName, 
    eventDocId, 
    isUnselect 
}) => {
    const updatedList = list.map((item, i) => {
        if (i === index) {
            return isUnselect
                ? { ...item, user: "undifined" }
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
