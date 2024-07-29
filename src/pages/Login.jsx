// initiate this Login.jsx
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    const configuration = {
      method: "post",
      url: "http://localhost:4000/login",
      data:{
        email,
        password
      }
    }
    axios(configuration)
      // for dev tests
      // .then((result) => {console.log(result)})
      // .catch((error) => {console.log(error)})
      .then((result) => {
        // set the login state to true
        setLogin(true);
        /**
         * This code below sets the cookie with cookie.set(). It takes three arguments: 
         * Name of the cookie (here it's "TOKEN", but it can be anything that you choose), 
         * Value of the cookie (result.data.token),
         *  and on which page or route you want it to be available (setting the path to "/" makes the cookie available in all the pages). 
         * Hopefully, that makes sense.
         */
        cookies.set("TOKEN",result.data.token, { path: "/" });
        window.location.href = "/profile";
      })
      .catch((error) => {
        error = new Error();
      });

    e.preventDefault();
    console.log(email, password);
  }

  return (
  <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-dark-gray p-8 rounded shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="email"
              name="email"
              value={email}
              placeholder='Enter your email'
              onChange={(e) =>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="password"
              name="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-gray text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
          {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-error">You Are Not Logged in</p>
        )}
        </form>
      </div>
    </div>
    </>
    )
  }