import { useEffect, useState } from "react";
import { updateEvent } from "./AddEvent.js";
import { useParams } from "react-router-dom";
import { getEventById } from "./AddEvent.js";
import Form from "./Form.jsx";

export default function UpdateEvent() {
  const UpdateText = "Update Event";
  const { id: eventId } = useParams();

  const [event, setEvent] = useState("");
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const Event = await getEventById(eventId);
        setEvent(Event);
      } catch (err) {
        console.log("Error fetching event:", err);
      }
    };
    if (eventId) {
      fetchEvent(); // Fetch the event only if the ID exists
    }
  }, [eventId]);
  // console.log( "event" ,event);
  return (
    <>
      <Form
        Event={event}
        onsubmit={updateEvent}
        id={eventId}
        Buttontext={UpdateText}
      />
    </>
  );
}
