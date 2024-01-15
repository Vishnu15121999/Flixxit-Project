import { Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <div className='about-container'>
      <div className='sub-container'>
        <div className='advertise-page'>
          <Typography variant='h2' sx={{ fontWeight: 'bold', color: 'white', mt: '10px' }}>Breakthrough Streaming</Typography>
          <p>Flixxit is the most watched free TV and movie streaming service in the U.S.,
            dedicated to providing all people access to all the world's stories.
            As a leading ad-supported video-on-demand service, the company engages diverse audiences through a personalized experience and
            the world’s largest content library of over 200,000 movies and TV episodes, a growing collection of Tubi Originals, and nearly 250 FAST channels.
            Flixxit is part of the Flixxit Media Group, a division of Fox Corporation that oversees the company’s digital businesses. 
            We care deeply about our culture. The five values below serve as the guiding principles for everything we do..</p>
        </div>
      </div>
      <div className='advertise-subpage'>
          <div>
            <img src='./images/deliver-delight.png'/>
            <p>We are customer-focused, curious, and passionate. We deliver delight in the form of an exceptional experience on all fronts – for our customers, partners, and employees – and we have fun doing it.</p>
          </div>
          <div>
            <img src='./images/own-it.png'/>
            <p>We are all owners of the work that we do individually and as a team. We believe brilliant ideas can come from all corners of our organization, and encourage thought leadership from everyone at Flixxit.</p>
          </div>
          <div>
            <img src='./images/team-first.png'/>
            <p>We are most successful when we work together and perform as one team. We empower each other, prioritize team success, and trust our teammates to do the same.</p>
          </div>
        </div>
        <footer>
          <div><h2>Flixxit</h2></div>
          <div><img src='./images/image-7.png'/></div>
          <div><h3>Copyright © 2024 Flixxit, Inc.</h3></div>
        </footer>
    </div>
  )
}

export default About