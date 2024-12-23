import React, { useRef, useState } from 'react'
import './AddEventPage.css'
import { useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
 
export default function Form( { Event = {}   ,onsubmit , id ,Buttontext}  ) {
  // console.log("id",id);
  
    const { user } = useUser();
  //  const currentUserName = user?.username;
    const currentUserName ="nana";
    // console.log( "Event",Event);
    const [event, setEvent] = useState({
        event_title: "",
        imgUrl: "",
        maxParticipants: "",
        location: "",
        summary: "",
        description: "",
        event_host_name :currentUserName ,
        date: "",
        event_start_time: "",
        contribution_list: [],
        item_name: "",
      });
    
      // Synchronize the local state with the Event prop when it changes
      useEffect(() => {
        if (JSON.stringify(Event) !== JSON.stringify(prevEvent.current)) {
          setEvent({
            event_title: Event.event_title || "",
            imgUrl: Event.imgUrl || "",
            maxParticipants: Event.maxParticipants || "",
            location: Event.location || "",
            summary: Event.summary || "",
            description: Event.description || "",
            date: Event.date || "",
            event_start_time: Event.event_start_time || "",
            contribution_list: Event.contribution_list || [],
            item_name: "",
          });
          prevEvent.current = Event; // Update reference
        }
      }, [Event]);
      
      const prevEvent = useRef(Event);

    const addItem = () => {
        if (event.item_name.trim()) {
        setEvent((prevEvent) => ({
            ...prevEvent,
            contribution_list: [
              ...prevEvent.contribution_list,
              { item_name: prevEvent.item_name, user: "undefined" }, // Add user as undefined
            ],
            item_name: '', 
        }));
        } else {
        alert("Please fill the field."); 
        }
    };
    
    const removeItem = (index) => {
        setEvent((prevEvent) => ({
        ...prevEvent,
        contribution_list: prevEvent.contribution_list.filter((_, i) => i !== index), 
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
        contribution_list: event.contribution_list ,
        event_host_name :currentUserName ,
        item_name : ''
        };
        // console.log("new event",newEvent);
        
    const submitResult = id ? onsubmit (id,newEvent) : onsubmit(newEvent);
    submitResult
        .then(() => {
            setEvent({
                event_title: "",
                imgUrl: "",
                maxParticipants: "",
                location: "",
                summary: "",
                description: "",
                date: "",
                event_start_time: "",
                event_host_name :"",
                contribution_list: [],
                item_name: "",
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
        name="item_name"
        value={event.item_name}
        onChange={handleOnChange}
        />
        <button className="AddButton"  type="button" onClick={addItem}>Add Checklist Item</button>
    </div>
    <ul>
        {event.contribution_list.map((item, index) => (
        <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{item.item_name}</strong>
            <button type="button"
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

    <button className='button1' type='submit' > {Buttontext}</button>
    </form>
    </>
)
}