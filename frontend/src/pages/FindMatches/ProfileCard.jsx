import React from "react";
import ProfileModal from "./ProfileModal";

const ProfileCard = ({ profile, isLoading, modal_index, role }) => {
  if (isLoading) {
    return null; // 加载时不显示任何内容
  }

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const roleInfo = profile[`${role}_info`] || {};
  const images = roleInfo[`${role}_images`] || [];
  const experience = roleInfo[`${role}_experience`] || "";
  const lookingFor = roleInfo[`${role}_lookingfor`] || [];

  return (
    <>
      <div className="card bg-base-100 w-full h-full shadow-xl m-2">
        <figure className="h-96">
          {images[0] && (
            <img
              src={images[0]}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </figure>
        <div className="card-body">
          <button
            className="btn btn-link"
            onClick={() => document.getElementById(modal_index).showModal()}
          >
            See profile
          </button>
          <h2 className="card-title">
            {profile.preferredName}
            <div className="badge badge-secondary">{images.length} photos</div>
          </h2>
          <p>Looking for:</p>
          <ul>
            {lookingFor.map((string, index) => (
              <li key={index}>
                <div className="badge badge-primary">{string}</div>
              </li>
            ))}
          </ul>
          <p>Distance from you:</p>
          <div className="badge badge-info">1.4 miles</div>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{experience}</div>
            <div className="badge badge-outline">3 years</div>
          </div>
        </div>
      </div>

      <ProfileModal
        profile={profile}
        modal_index={modal_index}
        role={role}
        calculateAge={calculateAge}
      />
    </>
  );
};

export default ProfileCard;
