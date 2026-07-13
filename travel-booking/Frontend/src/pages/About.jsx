import React from 'react'
import AboutHero from '../components/about/AboutHero'
import AboutStory from '../components/about/AboutStory'
import OurMission from '../components/about/OurMission'
import WhyChooseUs from '../components/about/WhyChooseUs'
import TeamSection from '../components/about/TeamSection'
import Statistics from '../components/about/Statistics'
import CallToAction from '../components/about/CallToAction'

const About = () => {
  return (
    <div >
        <AboutHero/>
        <AboutStory/>
        <OurMission/>
        <WhyChooseUs/>
        <TeamSection/>
        <Statistics/>
        <CallToAction/>
    </div>
  )
}

export default About