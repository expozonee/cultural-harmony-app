/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext } from "react";
import { getEvents } from "../firebase/utils/getEvents";
import { db } from "../firebase/firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUserSubscribe } from "../hooks/useUserSubscribe";

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const { isSignedIn } = useUser();
  const [userId, userData, userRef, users] = useUserSubscribe();

  async function getUserJoinedEvents() {
    if (!userData) return;

    const userJoinedEvents = (await getEvents()).filter((e) =>
      userData.eventsJoined.includes(e.id)
    );

    return userJoinedEvents;
  }

  async function getUserCreatedEvents() {
    if (!isSignedIn) return;

    const userCreatedEvents = (await getEvents()).filter((e) =>
      userData?.eventsOrganized.includes(e.id)
    );

    return userCreatedEvents;
  }

  async function joinEvent(id) {
    if (!isSignedIn) return;

    if (userData.eventsJoined.includes(id)) return;

    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      eventsJoined: arrayUnion(id),
    });
  }

  async function unJoinEvents(ids) {
    for (const id of ids) {
      await updateDoc(userRef, {
        eventsJoined: arrayRemove(id),
      });
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        getUserJoinedEvents,
        getUserCreatedEvents,
        joinEvent,
        unJoinEvents,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  const userContextData = useContext(UserContext);

  if (!userContextData) {
    throw new Error("User context must be used inside UserContextProvider");
  }

  return userContextData;
}
