import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import IntroBlock from './components/IntroBlock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="page-element">
      <Navbar />
      <IntroBlock />
    </div>
    
    </>
  )
}

export default App
