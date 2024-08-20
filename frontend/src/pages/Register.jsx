import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import axios from "axios"

export default function Register() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    // set configurations
    const configuration = {
      method: "post",
      url: `${import.meta.env.VITE_API_DOMAIN}/register`,
      data: {
        email,
        password,
      }
    }
    axios(configuration)
      .then((result) => setRegister(true))
      .catch((error) => {console.log(error) });

    // prevent the form from refreshing the whole page
    e.preventDefault();
  }

  return (
  <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-8 rounded shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="email"
              name="email"
              value={email}
              required
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              className="border border-gray-300 p-2 w-full rounded"
              type="password"
              name="password"
              value={password}
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-gray text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            type="submit"
            onClick={(e)=> handleSubmit(e)}
          >
            Register
          </button>

          {register ? 
          (<div className="text-center text-green">You have successfully registered</div> )
          : (<p className='text-center text-error'>You are not registered</p>)}
        </form>
      </div>
    </div>
  </>
  )
        
}
