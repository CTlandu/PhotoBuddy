import React from "react";
import ProfileImageSlider from "./ProfileImageSlider";

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

      <dialog id={modal_index} className="modal">
        <div className="modal-box max-w-lg max-h-[90vh]">
          <div className="flex items-center space-x-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                {profile.avatar && (
                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex-1 bg-gray-200 p-4 rounded-lg">
              <p>
                <strong>Name:</strong> {profile.preferredName}
              </p>
              <p>
                <strong>Pronouns:</strong> {profile.pronouns}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              {profile.birthday && (
                <p>
                  <strong>Age:</strong> {calculateAge(profile.birthday)}
                </p>
              )}
              <p>{profile.location || "Williamsburg, VA"}</p>
              {profile.contact.phoneNumber_preferred && (
                <p>{profile.contact.phoneNumber}</p>
              )}
              {["instagram", "linkedin", "twitter", "facebook"].map(
                (platform) =>
                  profile.contact[`${platform}_preferred`] && (
                    <p key={platform}>
                      <a
                        href={`https://www.${platform}.com/${profile.contact[platform]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green hover:underline"
                      >
                        <strong>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </strong>
                      </a>
                    </p>
                  )
              )}
            </div>
          </div>
          <ProfileImageSlider profile={profile} role={role} />
        </div>

        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => document.getElementById(modal_index).close()}
        ></form>
      </dialog>
    </>
  );
};

export default ProfileCard;
