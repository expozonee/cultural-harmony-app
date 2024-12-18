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
        console.error('Error fetching data from Firestore: ', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <h1 className="event-list-title">Upcoming Events</h1>
      <ul className="events-list">
        {events.map((event) => (
          <li className="event-preview" key={event.id}>
            <div>
              <EventPreview event={event} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsList;
