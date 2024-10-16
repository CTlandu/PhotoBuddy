import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";

const UserBasicInfo = ({ profile, calculateAge, role }) => {
  const roleInfo = profile[`${role}_info`] || {};
  const experience = roleInfo[`${role}_experience`] || "";
  const lookingFor = roleInfo[`${role}_lookingfor`] || [];
  const biography = roleInfo[`${role}_bio`] || "";

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-6 mb-4">
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
        <div>
          {profile.birthday && (
            <p className="text-lg">
              {calculateAge(profile.birthday)} years old
            </p>
          )}
          {profile.pronouns && <p className="text-lg">{profile.pronouns}</p>}
          {profile.addresses && profile.addresses.length > 0 && (
            <div className="mt-2">
              {profile.addresses.map((address, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {address.city && address.state
                    ? `${address.city}, ${address.state}`
                    : address.formattedAddress || "Address not available"}
                </span>
              ))}
            </div>
          )}
          {profile.showEmailOnCard && profile.email && (
            <p className="text-lg flex items-center mt-2">
              <FaEnvelope className="mr-2" /> {profile.email}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        {["instagram", "linkedin", "twitter", "facebook"].map(
          (platform) =>
            profile.contact[`${platform}_preferred`] && (
              <a
                key={platform}
                href={`https://www.${platform}.com/${profile.contact[platform]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-gray-800"
              >
                {platform === "instagram" && <FaInstagram />}
                {platform === "linkedin" && <FaLinkedin />}
                {platform === "twitter" && <FaTwitter />}
                {platform === "facebook" && <FaFacebook />}
              </a>
            )
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Experience</h3>
        <div className="flex flex-wrap">
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2">
            {experience}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Looking for</h3>
        <div className="flex flex-wrap">
          {lookingFor.map((item, index) => (
            <span
              key={index}
              className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {biography && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Biography</h3>
          <p>{biography}</p>
        </div>
      )}
    </div>
  );
};

export default UserBasicInfo;
