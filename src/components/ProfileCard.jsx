import React from 'react';
import { useState,useEffect } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import axios from 'axios';


const ProfileCard = () => {

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
        const userId = await Session.getUserId(); // 替换为实际的用户ID
        console.log("UserId:\n" + userId);
        const response = await axios.get(`http://localhost:4000/api/profile`, {
            params: { id: userId }
        });
        setProfile(response.data);
    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
  };


  //initiate use effect
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
    {loading ? null :
      <div className="card bg-base-100 w-96 shadow-xl">
      <figure className='h-96'>
        <img src={profile.model_info.model_images[2]}></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {profile.preferredName}
          <div className="badge badge-secondary">{profile.model_info.model_images.length} photos</div>
        </h2>
        <p>Looking for: 
          <ul>
            {profile.model_info.model_lookingfor.map((string, index) => (
              <li key={index}><div className='badge badge-primary'>{string}</div></li>
            ))}
          </ul>
        </p>
        <p>Distance from you: <div className='badge badge-info'>1.4 miles</div></p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{profile.model_info.model_experience}</div>
          <div className="badge badge-outline">3 years</div>
        </div>
      </div>
    </div>
    }
      
    </>
  );
}

export default ProfileCard;