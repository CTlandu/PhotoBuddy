import { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import IntroBlock from '../components/IntroBlock'
import Carousel from '../components/Carousel'
import HeroImage from "../assets/hero_img.jpg"

function Home() {

  return (
    <>
      <div className="top-0 left-0 w-full z-50">
        <Navbar/>  
      </div>
      
      <IntroBlock></IntroBlock>
      
      
      {/* <Carousel></Carousel> */}
      <div className="text-center mt-8">
        <p className="text-gray-500">&copy; 2024 PhotoBuddy. All rights reserved.</p>
      </div>
    
    </>
  )
}

export default Home
