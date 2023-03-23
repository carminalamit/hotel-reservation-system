import './App.css'
import ListExample from './components/Navbar'
import UncontrolledExample from './components/Hero'
import AutoLayoutExample from './components/Services'
import Footer from './components/Footer'
// import React, { useEffect, useState } from 'react'
// import { Outlet, Link } from 'react-router-dom'


function App() {
  return (
    <>
      <div>
      <ListExample/>
      <UncontrolledExample />
      <AutoLayoutExample />
      <Footer />
      </div>
    </>
  )
}

export default App