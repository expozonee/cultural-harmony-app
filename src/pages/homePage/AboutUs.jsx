import React from 'react'
import './aboutUs.css'

export default function AboutUs() {
  return (
   <>
   <div className='section1'>
    
    <img className='purblebackground'
    src='/images/img4.jpg'/>
    <img className='partyimg'
    src='/images/img1.jpg'/> 
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
      <section className="section3">
        <h2>Our Services</h2>
        <section className='services-container'>
        <div className="services-container">
       
        <div className="EventManagement-card">
          <div className="EventManagement-image">
            <img src='/images/img2.jpg' alt="Coaching" />
          </div>
          <h3>Coaching</h3>
          <p>Lorem Ipsum</p>
        </div>
        </div>
        </section>
    

      </section>
   </>
  )
}
