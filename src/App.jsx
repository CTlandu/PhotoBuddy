import { BrowserRouter, Routes, Route } from 'react-router-dom'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit/AuthProvider'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'


function App() {
  const store = createStore(
    {
      authName: '_auth',
      authType: 'cookie',
      cookieDomain: window.location.hostname,
      cookieSecure: window.location.protocol === 'https:',
      cookiePath: '/',
    }
  )

  return (
    <>
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NoPage></NoPage>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
    </>
  )
}

export default App
