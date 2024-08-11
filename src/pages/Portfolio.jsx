// Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
// import Cookies from "universal-cookie"
import Sidebar from '../components/Sidebar';
import PersonalForm from '../components/PersonalForm';
import Session from 'supertokens-auth-react/recipe/session';
import Model_Portfolio from '../components/PortfolioForm';
import PortfolioForm from '../components/PortfolioForm';


const Portfolio = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
        const userId = await Session.getUserId(); // 替换为实际的用户ID
        console.log("userID:\n"+userId);
        const response = await axios.get(`http://localhost:4000/profile`, {
            params: { id: userId }
        });
        setProfile(response.data);
    } catch (err) {
        setError(err);
    } finally {
        setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error.message}</div>;
  }

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };


  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar/>
        <div className="flex flex-1 mt-16">
          <Sidebar className="pl-24"/>
          <PortfolioForm profile={profile} onProfileUpdate={handleProfileUpdate}/>

        </div>


      </div>
    </>
  );
};

export default Portfolio;
