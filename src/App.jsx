import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit/AuthProvider'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Register from './pages/Register'
import ProtectedRoute from './ProtectedRoute'
import Profile from './pages/Profile'


function App() {
  // const store = createStore(
  //   {
  //     authName: '_auth',
  //     authType: 'cookie',
  //     cookieDomain: window.location.hostname,
  //     cookieSecure: window.location.protocol === 'https:',
  //     cookiePath: '/',
  //   }
  )

  return (
    <>
    {/* <AuthProvider store={store}> */}
      <BrowserRouter>
        <Routes>
           {/* free routes */}
          <Route index element={<Home/>}></Route>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route path="*" element={<NoPage />}></Route>

          {/* protected routes */}
          <Route path='/profile' element={<ProtectedRoute element={Profile}/>}></Route>
        </Routes>
      </BrowserRouter>
    {/* </AuthProvider> */}
    
    </>
  )
}

export default App
