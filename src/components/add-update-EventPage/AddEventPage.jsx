import React, { useState } from 'react'
import './AddEventPage.css'
import {postEvent} from './AddEvent.js'
import Form from './Form.jsx'





export default function AddEventPage() {

  const event ={
    event_title :'',
    imgUrl : '',
    maxParticipants : '',
    location : '',
    summary: '',
    description: '',
    date: '',
    event_start_time: '',
    items: [] ,
    newItem : ''
  }
  return (
      <>
    <Form Event={event} onsubmit={postEvent} />
    </>
  )
}
