import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { signOut } from 'supertokens-auth-react/recipe/session';
import { redirectToAuth } from 'supertokens-auth-react';
import Session from "supertokens-auth-react/recipe/session";
import emptyAvatar from '../assets/empty_avatar.jpg';


const Navbar = () => {

  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const menuRef = useRef(null);

  // 页面刷新时，获取当前的token
  useEffect(() => {
    fetchToken();
  }, []);

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
      const response = await axios.get(`http://localhost:4000/api/profile`, {
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

  /**
 * 点击菜单外时处理函数
 *
 * @param event 鼠标点击事件对象
 * @returns 无返回值
 */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        menuRef.current.removeAttribute('open');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="flex">
          <a href='/findmatches'>Find Matches!</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 mr-28">
            {accessToken && (
              <li className="flex items-center">
                <details className='relative' ref={menuRef}>
                  <summary 
                    className="flex items-center justify-center h-9 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button 
                      className="flex items-center justify-center h-7 overflow-hidden"
                      onClick={() => menuRef.current.open = !menuRef.current.open}
                    >
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