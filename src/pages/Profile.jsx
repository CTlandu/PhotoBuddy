// Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from "universal-cookie"
import Sidebar from '../components/Sidebar';
import PersonalForm from '../components/PersonalForm';


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
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 ml-28 mt-20">
          <Sidebar />
          <PersonalForm />

        </div>


      </div>
    </>
  );
};

export default Profile;
