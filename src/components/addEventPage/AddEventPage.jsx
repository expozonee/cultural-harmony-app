import React, { useState } from 'react'
import './AddEventPage.css'
import {postEvent} from './AddEvent'



export default function AddEventPage() {


    const [event_title,setevent_title]=useState("");
    const [imgUrl,setimgUrl]=useState("");
    const [maxParticipants,setmaxParticipants]=useState(0);
    const [location,setlocation]=useState("");
   const [formsummary, setFormsummary] = useState({
    summary: '',
    description: '',
  });
   const [formDate, setFormDate] = useState({
    date: '',
    event_start_time: '',
  });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "" });


  



  function handleSubmit(e){
    e.preventDefault();
    const newEvent = {
    event_title : event_title,
    imgUrl: imgUrl,
    maxParticipants :maxParticipants ,
    location:location,
    formsummary :formsummary ,
    formDate :formDate,
    items :items
    };
    postEvent(newEvent)
    .then(() => {
      setevent_title("");
      setimgUrl("");
      setmaxParticipants(0);
      setlocation("");
      setFormsummary({ summary: "", description: "" });
      setFormDate({ date: "", event_start_time: "" });
      setItems([]);
  
    })
    .catch((error) => {
        console.error("Failed to submit event:", error);
    });
   

  }
console.log(items);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (newItem.title ) {
      setItems((prev) => [...prev, newItem]);
      setNewItem({ title: ""});
    } else {
      alert("Please fill the field.");
    }
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };


 
 
  return (
      <>
      
<form className='form1'  onSubmit={handleSubmit}>
    <div className='form-group'>
    <label>Event Title</label>
    <input type="text" value={event_title} onChange={(e)=>{
      setevent_title(e.target.value);
    }} />
    </div>
    <div  className='form-group'>
    <label>summary</label>
    <input type="text" value={formsummary.summary} onChange={(e)=>{
     setFormsummary((prevFormSummary) => ({
      ...prevFormSummary,
      summary: e.target.value,
    }));
    }} />
    </div>

    <div  className='form-group'>
    <label>Date</label>
    <input type="date" value={formDate.date} onChange={(e)=>{
       setFormDate((prevFormDate) => ({
        ...prevFormDate,
        date: e.target.value,
      }));
    }} />
    </div>

    <div  className='form-group'>
    <label>Starting Time</label>
    <input type="time" value={formDate.event_start_time} onChange={(e)=>{
      setFormDate((prevevent_start_time) => ({
        ...prevevent_start_time,
        event_start_time: e.target.value,
      }));
    }} />
    </div>

    <div  className='form-group'>
    <label>description</label>
    <textarea value={formsummary.description} onChange={(e)=>{
        setFormsummary((prevFormdescription) => ({
          ...prevFormdescription,
          description: e.target.value,
        }));
    }} />
    </div>
    <div  className='form-group'>
    <label>image </label>
    <input type="text"  value ={imgUrl} onChange={(e)=>{
      setimgUrl(e.target.value);
    }} />
    </div>

    <div  className='form-group'>
    <label>location </label>
    <input type="text"  value ={location} onChange={(e)=>{
      setlocation(e.target.value);
    }} />
    </div>

    <div  className='form-group'>
    <label>Max Participants </label>
    <input type="number"  value ={maxParticipants} onChange={(e)=>{
      setmaxParticipants(e.target.value);
    }} />
    </div>

    <div >
      <h1>Event Item</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={newItem.title}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        {/* <input
          type="text"
          name="description"
          placeholder="Item Description"
          value={newItem.description}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        /> */}
        <button className="AddButton" onClick={addItem}>Add Checklist Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{item.title}</strong>
            <button
              onClick={() => removeItem(index)}
              style={{
                marginLeft: "10px",
                color: "white",
                backgroundColor: "red",
                border: "none",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>

    <button className='button1' type='submit'> Add Event</button>
    </form>

   </>
  )
  
}
