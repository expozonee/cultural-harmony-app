import React, { useState } from 'react'
import './AddEventPage.css'
import { useEffect } from 'react';



export default function Form( { Event = {}   ,onsubmit , id} ) {

    console.log( "Event",Event);
    const [event, setEvent] = useState({
        event_title: "",
        imgUrl: "",
        maxParticipants: "",
        location: "",
        summary: "",
        description: "",
        date: "",
        event_start_time: "",
        items: [],
        newItem: "",
      });
    
      // Synchronize the local state with the Event prop when it changes
      useEffect(() => {
        if (Event) {
          setEvent({
            event_title: Event.event_title || "",
            imgUrl: Event.imgUrl || "",
            maxParticipants: Event.maxParticipants || "",
            location: Event.location || "",
            summary: Event.summary || "",
            description: Event.description || "",
            date: Event.date || "",
            event_start_time: Event.event_start_time || "",
            items: Event.items || [],
            newItem: "",
          });
        }
      }, [Event]);
    

    const addItem = () => {
        if (event.newItem.trim()) {
        setEvent((prevEvent) => ({
            ...prevEvent,
            items: [...prevEvent.items, prevEvent.newItem], 
            newItem: '', 
        }));
        } else {
        alert("Please fill the field."); 
        }
    };
    
    const removeItem = (index) => {
        setEvent((prevEvent) => ({
        ...prevEvent,
        items: prevEvent.items.filter((_, i) => i !== index), 
        }));
    };


    const handleOnChange = (e) => {
        const { name, value } = e.target; 
        setEvent((prevEvent) => ({
        ...prevEvent,
          [name]: value, 
        }));
    };

    function handleSubmit(e){
        e.preventDefault();
        const newEvent = {
        event_title : event.event_title,
        imgUrl: event.imgUrl,
        maxParticipants :event.maxParticipants ,
        location:event.location,
        summary: event.summary,
        description: event.description,
        date: event.date,
        event_start_time: event.event_start_time,
        items: event.items ,
        newItem : ''
        };
        console.log("new event",newEvent);
        
        onsubmit(newEvent).then(() => {
            setEvent({
                event_title: "",
                imgUrl: "",
                maxParticipants: 0,
                location: "",
                summary: "",
                description: "",
                date: "",
                event_start_time: "",
                items: [],
                newItem: "",
              });
        })
        .catch((error) => {
            console.error("Failed to submit event:", error);
        }); }
       
  return (
    <>
    <form className='form1' onSubmit={handleSubmit} >
    <div className='form-group'>
    <label>Event Title</label>
    <input  name="event_title" type="text" value={event.event_title} onChange={handleOnChange} />
    </div>
    <div  className='form-group'>
    <label>summary</label>
    <input   name="summary" type="text" value={event.summary} onChange={handleOnChange} />
    </div>

    <div  className='form-group'>
    <label>Date</label>
    <input   name="date" type="date" value={event.date} onChange={handleOnChange} />
    </div>

    <div  className='form-group'>
    <label>Starting Time</label>
    <input  name="event_start_time" type="time" value={event.event_start_time} onChange={handleOnChange} />
    </div>

    <div  className='form-group'>
    <label>description</label>
    <textarea name="description"  value={event.description} onChange={handleOnChange} />
    </div>
    <div  className='form-group'>
    <label>Image URL </label>
    <input name="imgUrl"  type="text"  value ={event.imgUrl} onChange={handleOnChange} />
    </div>

    <div  className='form-group'>
    <label>location </label>
    <input  name="location"  type="text"  value ={event.location} onChange={handleOnChange} />
    </div>

    <div  className='form-group'>
    <label>Max Participants </label>
    <input name="maxParticipants" type="number" value ={event.maxParticipants} onChange={handleOnChange} />
    </div>

    <div >
    <h1>Event Item</h1>
    <div>
        <input
        type="text"
        name="newItem"
        value={event.newItem}
        onChange={handleOnChange}
        />
        <button className="AddButton"  type="button" onClick={addItem}>Add Checklist Item</button>
    </div>
    <ul>
        {event.items.map((item, index) => (
        <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{item}</strong>
            <button
            style={{
                marginLeft: "10px",
                color: "white",
                backgroundColor: "red",
                border: "none",
                padding: "5px",
                cursor: "pointer",
            }}
            onClick={() =>removeItem(index)} 
            >
            Remove
            </button>
    </li>
        ))}
    </ul>
    </div>

    <button className='button1' type='submit' > Add Event</button>
    </form>
    </>
)
}