/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../firebase/utils/getUsers";
import { getEvents } from "../firebase/utils/getEvents";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { addUserToDb } from "../firebase/utils/addUserToDb";

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(undefined);
  const { user, isSignedIn } = useUser();
  const userEmailAddress = user?.primaryEmailAddress.emailAddress;

  useEffect(() => {
    if (!isSignedIn) {
      setUserData(undefined);
    }
  }, [isSignedIn]);

  async function addNewUsersToDb() {
    if (!isSignedIn) return;

    const users = await getUsers();
    const userEmailAddress = user.primaryEmailAddress.emailAddress;
    const isUserInDb = users.find((u) => u.email === userEmailAddress);

    if (!isUserInDb) {
      const userToAdd = {
        email: userEmailAddress,
        profileImage: user.imageUrl,
        eventsJoined: [],
        eventsOrganized: [],
        isAdmin: false,
        name: user.fullName,
      };

      const newUser = await addUserToDb(userToAdd);
      if (!newUser) return;
      return newUser;
    }
  }

  async function initialUserData() {
    if (!isSignedIn) return;

    const users = await getUsers();
    const findUserInDb = users.find((u) => u.email === userEmailAddress);
    if (!findUserInDb) {
      setUserData(addNewUsersToDb());
    } else {
      setUserData(findUserInDb);
    }
  }

  if (!userData) {
    initialUserData();
  }

  async function getUserJoinedEvents() {
    if (!isSignedIn) return;

    const userJoinedEvents = (await getEvents()).filter((e) =>
      userData.eventsJoined.includes(e.id)
    );

    return userJoinedEvents;
  }

  async function getUserCreatedEvents() {
    if (!isSignedIn) return;

    const userCreatedEvents = (await getEvents()).filter((e) =>
      userData.eventsOrganized.includes(e.id)
    );

    return userCreatedEvents;
  }

  async function joinEvent(id) {
    if (!isSignedIn) return;

    if (userData.eventsJoined.includes(id)) return;

    const userRef = doc(db, "users", userData.id);

    await updateDoc(userRef, {
      eventsJoined: [...userData.eventsJoined, `${id}`],
    });

    const user = (await getUsers()).find((u) => u.email === userEmailAddress);

    setUserData(user);
  }

  return (
    <UserContext.Provider
      value={{ getUserJoinedEvents, getUserCreatedEvents, joinEvent }}
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
