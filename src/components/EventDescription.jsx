import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { db } from '../firebaseConfig';

function EventDescription() {
  const { eventId } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!location.state?.event);

  useEffect(() => {
    if (!event) {
      const fetchEvent = async () => {
        try {
          const docRef = doc(db, 'events', eventId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setEvent({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error('Event not found');
          }
        } catch (error) {
          console.error('Error fetching data from Firestore: ', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [event, eventId]);

  if (loading) return <p>Loading...</p>;

  if (!event) return <p>Event not found!</p>;

  return (
    <div className="description-page-container">
      <h1>{event.event_title}</h1>
      <p>{event.event_host_name}</p>
      <p className="event-description-info">{event.description}</p>
      <img
        className="event-image-description"
        src={event.imgUrl}
        alt={event.event_title}
      />
      <p>Date: {event.date}</p>
    </div>
  );
}

export default EventDescription;
