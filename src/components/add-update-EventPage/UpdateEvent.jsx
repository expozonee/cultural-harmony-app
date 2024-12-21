import React, { useEffect, useState } from 'react'
import {updateEvent} from './AddEvent.js'
import { useParams } from 'react-router-dom'
import {getEventById} from './AddEvent.js'
import Form from './Form.jsx';

export default function UpdateEvent() {
    // const eventId = useParams();
    // const event = getEventById(eventId);
    const id = "vfzqiOiCQveW6ZFG72Lx";
    const [event ,setEvent]=useState("");
    useEffect(() => {
      const fetchEvent = async () => {
        try {
         const Event = await getEventById("vfzqiOiCQveW6ZFG72Lx");
         setEvent(Event);
        } catch (err) {
          console.log("Error fetching event:", err);
        }
      };
    
      fetchEvent(); // Call the async function
    
    }, []);
    console.log( "event" ,event);
  return (
   <>
   <Form Event={event} onsubmit={updateEvent} id={id} />
   </>
  )
}
