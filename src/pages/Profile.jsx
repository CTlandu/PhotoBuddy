// Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from "universal-cookie"


const Profile = () => {

  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  const [message, setMessage] = useState('');

  useEffect(() => {
    // set configuration for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:4000/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });

  }, [])


  return (
    <>
      <Navbar></Navbar>
      <h1 className='text-center text-6xl text-pink-purple'>Profile Page</h1>
      <h3 className="text-center text-danger">{message}</h3>
    </>

  )
};

export default Profile;
