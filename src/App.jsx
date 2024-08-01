import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
// importing SuperTokens packages
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Github, Google, Facebook, Apple } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import * as reactRouterDom from "react-router-dom";
// import createStore from 'react-auth-kit/createStore'
// import AuthProvider from 'react-auth-kit/AuthProvider'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Register from './pages/Register'
import ProtectedRoute from './ProtectedRoute'
import Profile from './pages/Profile'
import Profile_test from './pages/Profile_test'

const APP_NAME = import.meta.env.VITE_APP_NAME;
const API_DOMAIN = import.meta.env.VITE_APP_API_DOMAIN;
const WEB_DOMAIN = import.meta.env.VITE_WEBSITE_DOMAIN;
console.log(APP_NAME, API_DOMAIN, WEB_DOMAIN)

SuperTokens.init({
  appInfo: {
      // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
      appName: "photobuddy",
        apiDomain: "http://localhost:4000",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
  },
  recipeList: [
      ThirdParty.init({
          signInAndUpFeature: {
              providers: [
                  Github.init(),
                  Google.init(),
                  Facebook.init(),
                  Apple.init(),
              ]
          }
      }),
      EmailPassword.init(),
      Session.init()
  ]
});

function App() {

  return (
    <>
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI])}
          
          {/*Your app routes*/}

           {/* free routes */}
          <Route index element={<Home/>}></Route>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route path="*" element={<NoPage />}></Route>
          <Route path="/profile_test" element={<Profile_test />}></Route>

          {/* protected routes */}
          <Route path='/profile' element={<ProtectedRoute element={Profile}/>}></Route>
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
    
    </>
  )
}

export default App
