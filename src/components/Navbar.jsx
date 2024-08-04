import React, { useEffect } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useState } from 'react';
const cookies = new Cookies();
import { signOut } from 'supertokens-auth-react/recipe/session';
import { redirectToAuth } from 'supertokens-auth-react';
import Session from "supertokens-auth-react/recipe/session";


const Navbar = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 页面刷新时，获取当前的token
  useEffect(() => {
    async function fetchToken() {
      const token = await getToken();
      setAccessToken(token);
      setLoading(false);
    }

    fetchToken();
  }, [accessToken]);

  // 获取Token，若没有则返回null
  async function getToken() {  
    try{
      return await Session.getAccessToken();
    }catch{
      return null;
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
          {/* <li><a href='/register'>Register</a></li> */}
          {/* 原先:导航至login页面 */}
          {/* <li><a href='/login'>Log in</a></li> */}
          {/* <li><button onClick={()=>loginWithRedirect()}>Log in</button></li> */}
          {accessToken && <li><a href='/profile'>Profile</a></li>}
          {accessToken && <li><button onClick={onLogout}>
            Logout
            </button>
          </li>}
          {!accessToken && <li><button onClick={onLogin}>SuperToken Login</button></li>}
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>


    
  </>
    
  );
};

export default Navbar;