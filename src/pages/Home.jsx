import { useState,useEffect } from 'react'
// import './App.css'
import Navbar from '../components/Navbar'
import IntroBlock from '../components/IntroBlock'
import Carousel from '../components/Carousel'

function Home() {
  // const [backendData, setBackendData] = useState([{}]);
  // useEffect(() => {
  //   fetch('http://localhost:4000/api/items')
  //     .then(response => response.json())
  //     .then(data => setBackendData(data))
  // }, [])

  return (
    <>
    
    <div className="page-element">
      <Navbar />
      <IntroBlock />
      <Carousel></Carousel>
      
    </div>
    
    </>
  )
}

export default Home
