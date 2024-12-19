import React, { useState } from 'react'
import './AddEventPage.css'

export default function AddEventPage() {
    const [event_title,setevent_title]=useState("");
  const [imgUrl,setimgUrl]=useState("");
  const [summary,setsummary]=useState("");
  const [location,setlocation]=useState("");
//   const [summary,setsummary]=useState("");
//   const [summary,setsummary]=useState("");

  function handleSubmit(e){
    e.preventDefault();
    const newProduct = {
        event_title : event_title,
      description: summary,
      imgUrl: imgUrl,
    };
    setevent_title("");
    setimgUrl("");
    setsummary("");
  }
 
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
    <label>description</label>
    <textarea value={summary} onChange={(e)=>{
      setsummary(e.target.value);
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



    <button className='button1' type='submit'> Add product</button>
    </form>

   </>
  )
  
}
