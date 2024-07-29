import React, { useEffect } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useState } from 'react';
const cookies = new Cookies();


const Navbar = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Get token genearted on login
    try{
      const token = cookies.get('TOKEN');
      if(token === undefined) return;
      setHasToken(true);
    }catch{
      console.log("No token found 用户未登录")
    }
  }, []);
    const logout = () =>{
      // redirect to landing page
      window.location.href = "/"
      //destroy the cookie
      cookies.remove('TOKEN', {path: '/'});
      setHasToken(false);
      // redirect user to the landing page
    }

  return (
  <>
    <div className="navbar bg-base-100 mt-4">
      <div className="flex-1 ml-24">
        <a className="btn btn-ghost text-xl" href='/' >PhotoBuddy</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 mr-28">
          <li><a href='/register'>Register</a></li>
          <li><a href='/login'>Log in</a></li>
          {hasToken && <li><a href='/profile'>Profile</a></li>}
          {hasToken && <li><button onClick={logout}>Logout</button></li>}
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