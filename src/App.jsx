import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'


function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NoPage></NoPage>}></Route>
        </Routes>
      </BrowserRouter>

    
    </>
  )
}

export default App
