import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
// importing SuperTokens packages
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Github, Google, Facebook, Apple } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from 'supertokens-auth-react/recipe/emailverification';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import * as reactRouterDom from "react-router-dom";
// import createStore from 'react-auth-kit/createStore'
// import AuthProvider from 'react-auth-kit/AuthProvider'
import Login from './pages/Login'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { useEffect, useState, createContext } from 'react'
import Portfolio from './pages/Portfolio';
import FindMatches from './pages/FindMatches';
import About from './pages/About';
import CookieConsent from './components/CookieConsent';

// const APP_NAME = import.meta.env.VITE_APP_NAME;
// const API_DOMAIN = import.meta.env.VITE_APP_API_DOMAIN;
// const WEB_DOMAIN = import.meta.env.VITE_WEBSITE_DOMAIN;

// console.log('App Name:', import.meta.env.VITE_APP_NAME);
// console.log('API Domain:', import.meta.env.VITE_API_DOMAIN);
// console.log('Website Domain:', import.meta.env.VITE_WEBSITE_DOMAIN);
// console.log('API Base Path:', import.meta.env.VITE_APP_API_BASE_PATH);
// console.log('Website Base Path:', import.meta.env.VITE_WEBSITE_BASE_PATH);

SuperTokens.init({
  appInfo: {
      // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
      appName: import.meta.env.VITE_APP_NAME,
      apiDomain: import.meta.env.VITE_API_DOMAIN,
      websiteDomain: import.meta.env.VITE_WEBSITE_DOMAIN,
      apiBasePath: import.meta.env.VITE_APP_API_BASE_PATH,
      websiteBasePath: import.meta.env.VITE_WEBSITE_BASE_PATH,
  },
  recipeList: [
      // 第三方登录选项
      // ThirdParty.init({
      //     signInAndUpFeature: {
      //         providers: [
      //             Github.init(),
      //             Google.init(),
      //         ]
      //     }
      // }),
      EmailVerification.init({
        mode: "OPTIONAL", //OR OPTIONAL
      }),
      EmailPassword.init({
        contactMethod: "EMAIL_OR_PHONE",

            onHandleEvent: async (context) => {
                if (context.action === "PASSWORDLESS_RESTART_FLOW") {
                    // TODO:
                } else if (context.action === "PASSWORDLESS_CODE_SENT") {
                    // TODO:
                } else {
                    let {id, emails, phoneNumbers, timeJoined} = context.user;
                    if (context.action === "SUCCESS") {
                      const userInfo = {
                        id: id,
                        email: emails[0],
                        phoneNumber: phoneNumbers[0],
                        timeJoined: timeJoined,
                      }
                      // when sign up
                      if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
                        console.log(`sign up: ${id}, ${emails[0]},
                          phone number: ${phoneNumbers[0]}, time joined: ${timeJoined},
                         contextUser: ${JSON.stringify(context.user)}`)
                        await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/saveUserInfo`, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(userInfo)
                        });
                        // 重新加载主页面，以重新尝试获取token
                        window.location.reload();
                      }
                      // when log in 
                      else {
                        console.log(`log in: ${id}, ${emails[0]},
                          phone number: ${phoneNumbers[0]}, time joined: ${timeJoined},
                          contextUser: ${JSON.stringify(context.user)}`)
                        // 重新加载主页面，以重新尝试获取token
                        window.location.reload();
                      }
                    }
                }
            }
      }),
      Session.init()
  ]
});

async function getToken() {
  const isSessionValid = await Session.doesSessionExist();
  if (isSessionValid) {
      const accessToken = await Session.getAccessToken();
      console.log("Access Token: 有");
      return accessToken;
  } else {
      console.log("User is not logged in");
      return null;
  }
}

function App() {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const token = await getToken();
      setAccessToken(token);
    }

    fetchToken();
  }, []);

  return (
    <>
    {/** 页面打开时，询问用户关于cookie协议设置 */}
    <CookieConsent />
    
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {/*This renders the login UI on the /auth route*/}
          {/* {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI])} */}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI])}
          
          {/*Your app routes*/}

           {/* free routes */}
          <Route index element={<Home token={accessToken}/>}></Route>
          <Route exact path="/home" element={<Home token={accessToken}/>}/>
          <Route exact path='/findmatches' element={<FindMatches token={accessToken}/>}></Route>
          <Route exact path="/about" element={<About token={accessToken}/> }></Route>
          {/* <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route> */}
          <Route path="*" element={<NoPage token={accessToken}/>}></Route>
    

          {/* protected routes */}
          <Route path='/profile' element={
            <SessionAuth>
              <Profile token={accessToken}/>
            </SessionAuth>}>
          </Route>
          <Route path='/portfolio' element={
            <SessionAuth>
              <Portfolio token={accessToken}/>
            </SessionAuth>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
    
    </>
  )
}

export default App
