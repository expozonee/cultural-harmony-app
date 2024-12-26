/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { eventsRef } from "../firebase/utils/eventsRef";
import { eventsLoader } from "../../loaders/eventsLoader";
import { createContext, useEffect, useState } from "react";
import { useUserSubscribe } from "../hooks/useUserSubscribe";
import { useUserData } from "./UserContext";
import { getUsers } from "../firebase/utils/getUsers";
import { db } from "/src/firebase/firebaseConfig";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const { joinEvent } = useUserData();
  const [events, setEvents] = useState([]);
  const [, , userRef] = useUserSubscribe();

  useEffect(() => {
    async function getEvents() {
      const events = await eventsLoader();
      if (events) {
        setEvents(events);
      }
    }

    const unSubscribe = onSnapshot(eventsRef, (snapshot) => {
      if (snapshot.docs)
        setEvents(
          snapshot.docs.map((e) => {
            return {
              ...e.data(),
              id: e.id,
            };
          })
        );
    });

    getEvents();

    return () => unSubscribe();
  }, []);

  async function createEvent(event) {
    try {
      const createEvent = await addDoc(eventsRef, event);
      await updateDoc(userRef, {
        eventsOrganized: arrayUnion(createEvent.id),
      });
      await joinEvent(createEvent.id);
      return createEvent.id;
    } catch (error) {
      return error;
    }
  }

  async function updateEvent(event) {
    try {
      await updateDoc(eventsRef, event);
    } catch (error) {
      return { error };
    }
  }

  async function deleteEvent(ids) {
    for (const id of ids) {
      const eventRef = doc(db, "events", id);

      // remove the event from the user creator arr
      await updateDoc(userRef, {
        eventsOrganized: arrayRemove(id),
      });

      // remove the event from all the participants joined events array
      const users = await getUsers();
      for (const user of users) {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          eventsJoined: arrayRemove(id),
        });
      }

      // remove the event from the event database
      await deleteDoc(eventRef);
    }
  }

  return (
    <EventsContext.Provider
      value={{ events, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const eventsContext = useContext(EventsContext);

  if (!eventsContext) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return eventsContext;
}
