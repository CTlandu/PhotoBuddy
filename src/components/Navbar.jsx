import React, { useEffect } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useState } from 'react';
const cookies = new Cookies();
import { signOut } from 'supertokens-auth-react/recipe/session';
import { redirectToAuth } from 'supertokens-auth-react';
import Session from "supertokens-auth-react/recipe/session";
import emptyAvatar from '../assets/empty_avatar.jpg';


const Navbar = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  // 页面刷新时，获取当前的token
  useEffect(() => {
    fetchToken();
  }, [accessToken]);

  async function fetchToken() {
    const token = await getToken();
    setAccessToken(token);
    setLoading(false);
  }

  // 获取Token，若没有则返回null
  async function getToken() {  
    try{
      const token =  await Session.getAccessToken();
      const userId = await Session.getUserId(); 
      const response = await axios.get(`http://localhost:4000/profile`, {
        params: { id: userId }
      });
      setAvatar(response.data.avatar);
      return token;

    }catch(error){
      console.log(error);
    } 
  }

  // supertoken提供的logout方法（signOut)
  async function onLogout(){
    await signOut();
    window.location.href = "/";
  }

  // 点击登录按钮后，跳转到supertoken提供的login页面
  async function onLogin(){
    redirectToAuth();
  }

  // 若页面正在加载（还没获取到token），则返回null（空页面）
  if(loading){
    return null
  }

  return (
  <>
    <div className="navbar bg-base-100 mt-4">
      <div className="flex-1 ml-24">
        <a className="btn btn-ghost text-xl" href='/' >PhotoBuddy</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 mr-28">

          {accessToken && (
            <li className="flex items-center">
              <details>
                <summary className="flex items-center justify-center h-9 overflow-hidden">
                  <button className="flex items-center justify-center h-7 overflow-hidden">
                    <img className="w-full h-full object-cover rounded-full" src={avatar || emptyAvatar} alt="Avatar" />
                  </button>
                </summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                <li><a href='/profile'>Profile</a></li>
                <li>
                  <button onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </ul>
              </details>
            </li>
          )}

          {!accessToken && <li><button onClick={onLogin}>SuperToken Login</button></li>}

        </ul>
      </div>
    </div>


    
  </>
    
  );
};

export default Navbar;