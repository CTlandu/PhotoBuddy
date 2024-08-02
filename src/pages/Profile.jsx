// Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from "universal-cookie"
import Sidebar from '../components/Sidebar';
import PersonalForm from '../components/PersonalForm';
import Session from 'supertokens-auth-react/recipe/session';


const Profile = () => {

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
