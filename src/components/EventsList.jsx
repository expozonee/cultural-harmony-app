import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import EventPreview from './EventPreview';

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const queryEventsDB = await getDocs(collection(db, 'events'));

        const eventsData = queryEventsDB.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data from firestore: ', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id}>
            <EventPreview event={event} />
          </li>
        ))}
      </ul>
    </>
  );
}
export default EventsList;
