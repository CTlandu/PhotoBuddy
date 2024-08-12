import { useState,useEffect } from 'react'
// import './App.css'
import Navbar from '../components/Navbar'
import IntroBlock from '../components/IntroBlock'
import Carousel from '../components/Carousel'

function Home() {

  return (
    <>
    
    <div className="page-element">
      <Navbar/>
      <IntroBlock />
      <Carousel></Carousel>
      
    </div>
    
    </>
  )
}

export default Home
