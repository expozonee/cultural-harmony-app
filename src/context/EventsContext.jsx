/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
// import { db } from "../firebase/firebaseConfig";
import { eventsLoader } from "../../loaders/eventsLoader";
import { createContext, useEffect, useState } from "react";
import { addDoc, onSnapshot } from "firebase/firestore";
import { eventsRef } from "../firebase/utils/eventsRef";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const events = await eventsLoader();
      if (events) {
        setEvents(events);
        console.log(events);
      }
    }

    const unSubscribe = onSnapshot(eventsRef, (snapshot) => {
      if (snapshot.docs) setEvents(snapshot.docs);
    });

    getEvents();

    return () => unSubscribe();
  }, []);

  async function addEvent(event) {
    const addEvent = await addDoc(eventsRef, event);
    return addEvent.id;
  }

  return (
    <EventsContext.Provider value={(events, addEvent)}>
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
