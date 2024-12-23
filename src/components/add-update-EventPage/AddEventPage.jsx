import './AddEventPage.css'
import {postEvent} from './AddEvent.js'
import Form from './Form.jsx'





export default function AddEventPage() {
  const AddText ="Add Event";
  const event ={
    event_title :'',
    imgUrl : '',
    maxParticipants : '',
    location : '',
    summary: '',
    description: '',
    date: '',
    event_start_time: '',
    contribution_list: [] ,
    newItem : ''
  }
  return (
      <>
    <Form Event={event} onsubmit={postEvent}  Buttontext={AddText} />
    </>
  )
}
