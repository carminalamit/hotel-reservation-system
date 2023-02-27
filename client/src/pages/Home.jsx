import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'



const Home = () => {
  useEffect(() => {
    
  }, []) 
  return (
    <div>

      <Navbar />
      <Hero />
      <Services />
      
    </div>
  )
}

export default Home
