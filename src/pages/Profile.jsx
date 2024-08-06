// Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
// import Cookies from "universal-cookie"
import Sidebar from '../components/Sidebar';
import PersonalForm from '../components/PersonalForm';
import Session from 'supertokens-auth-react/recipe/session';


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const userId = await Session.getUserId(); // 替换为实际的用户ID
            console.log(userId);
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

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <p>ID: {profile.id}</p>
                    <p>Email: {profile.email}</p>
                    <p>Phone Number: {profile.phoneNumber}</p>
                    <p>Time Joined: {new Date(profile.timeJoined).toLocaleString()}</p>
                    <p>Verified: {profile.verified ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 ml-28 mt-20">
          <Sidebar />
          <PersonalForm profile={profile}/>

        </div>


      </div>
    </>
  );
};

export default Profile;
