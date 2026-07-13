import React from 'react'
import Hero from '../components/hero/Hero'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/NewsLetter'
import Statistics from '../components/home/Statistics'
import FAQ from '../components/home/FAQ'
import TravelCategories from '../components/home/TravelCategories'
import PopularDestinations from '../components/destinations/PopularDestinations'

function Home() {
  return (
    <div>
        <Hero/>
        <TravelCategories/>
        <PopularDestinations/>
        <WhyChooseUs/>
        <Statistics/>
        <Testimonials/>
        <FAQ/>
        <Newsletter/>
    </div>
  )
}

export default Home