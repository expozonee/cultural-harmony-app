import React from 'react'
import './aboutUs.css'

export default function AboutUs() {
  return (
   <>
   <div className='section1'>
    
    <img className='backgroundImg'
    src='/images/backgroundImg.jpg'/>
    <div className="content-card">
        <h1>
        We Make Event Planning <br />
        Effortless and Organized
        </h1>
        <p>PLAN • CONNECT • EXECUTE</p>
        </div>
    </div>

    <section className="section2">
        <h2>Who We Are</h2>
        <p>
        Group Organizer is a smart app designed to simplify the planning of group events and activities like parties or trips. Our platform lets you create events, assign roles, and send automatic reminders to participants. Easily share event details with your group and make decisions together with voting options. Customize each event for a seamless and personalized experience!
        </p>
      </section>
  </>
  )
}
