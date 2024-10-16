// Profile.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
// import Cookies from "universal-cookie"
import PersonalForm from "./PersonalForm";
import PortfolioForm from "../Portfolio/PortfolioForm";
import Session from "supertokens-auth-react/recipe/session";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navbarKey, setNavbarKey] = useState(0);

  const fetchProfile = async () => {
    try {
      const userId = await Session.getUserId(); // 替换为实际的用户ID
      console.log("UserId:\n" + userId);
      const response = await axios.get(
        `${import.meta.env.VITE_API_DOMAIN}/api/profile`,
        {
          params: { id: userId },
        }
      );
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
    setNavbarKey((prevKey) => prevKey + 1); // 改变 Navbar 的 key
  };

  return (
    <>
      <div className="flex flex-col bg-base-200 min-h-screen">
        <div className="top-0 left-0 w-full z-50">
          <Navbar token={token} key={navbarKey} />
        </div>
        <div className="flex flex-col flex-1 items-center">
          <PersonalForm
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
          <PortfolioForm
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
