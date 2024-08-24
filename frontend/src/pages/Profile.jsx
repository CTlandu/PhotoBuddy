// Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
// import Cookies from "universal-cookie"
import Sidebar from '../components/Sidebar';
import PersonalForm from '../components/PersonalForm';
import Session from 'supertokens-auth-react/recipe/session';


const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navbarKey, setNavbarKey] = useState(0);

  const fetchProfile = async () => {
    try {
        const userId = await Session.getUserId(); // 替换为实际的用户ID
        console.log("UserId:\n" + userId);
        const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/profile`, {
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
    setNavbarKey(prevKey => prevKey + 1); // 改变 Navbar 的 key
  };


  return (
    <>
      <div className="flex flex-col h-screen bg-base-200">
        {/** 通过给Navbar设置一个key，并在handleProfileUpdate里改变key，来实现每次personalform里头像更新的时候，navbar被重新加载 */}
        <Navbar token={token} key={navbarKey}/>
        <div className="flex flex-1">
          {/* <Sidebar /> */}
          <PersonalForm profile={profile} onProfileUpdate={handleProfileUpdate}/>

        </div>


      </div>
    </>
  );
};

export default Profile;
