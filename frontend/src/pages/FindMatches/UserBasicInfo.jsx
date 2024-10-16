import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaBirthdayCake,
  FaUserCircle,
  FaCamera,
  FaUserTie,
} from "react-icons/fa";

const UserBasicInfo = ({ profile, calculateAge, role }) => {
  const roleInfo = profile[`${role}_info`] || {};
  // const experience = roleInfo[`${role}_experience`] || "";
  // const lookingFor = roleInfo[`${role}_lookingfor`] || [];
  const biography = roleInfo[`${role}_bio`] || "";

  const addressColors = [
    "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
    "bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100",
    "bg-gray-400 text-gray-900 dark:bg-gray-500 dark:text-gray-50",
  ];

  // 创建一个函数来生成唯一的地址字符串
  const getUniqueAddressString = (address) => {
    const parts = [];
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.country) parts.push(address.country);
    return parts.join(", ");
  };

  // 使用 Set 来去除重复的地址
  const uniqueAddresses = profile.addresses
    ? [...new Set(profile.addresses.map(getUniqueAddressString))]
    : [];

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "photographer":
        return <FaCamera className="mr-1" />;
      case "model":
        return <FaUserTie className="mr-1" />;
      default:
        return null;
    }
  };

  const socialMediaIcons = {
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    facebook: FaFacebook,
  };

  const socialMediaColors = {
    instagram: "text-pink-600 hover:text-pink-700",
    linkedin: "text-blue-600 hover:text-blue-700",
    twitter: "text-blue-400 hover:text-blue-500",
    facebook: "text-blue-800 hover:text-blue-900",
  };

  return (
    <div className="mt-6 mb-1 flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <div className="avatar mr-4">
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
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-serif italic">
              {profile.preferredName}
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 flex items-center">
              {getRoleIcon(role)}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </div>
          <div className="space-y-2">
            {profile.birthday && profile.showAgeOnCard && (
              <p className="text-base flex items-center">
                <FaBirthdayCake className="mr-2 text-blue-500" />
                <span className="font-semibold">Age:</span>
                <span className="ml-2">{calculateAge(profile.birthday)}</span>
              </p>
            )}
            {profile.pronouns && (
              <p className="text-base flex items-center">
                <FaUserCircle className="mr-2 text-green-500" />
                <span className="font-semibold">Pronouns:</span>
                <span className="ml-2">{profile.pronouns}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {uniqueAddresses.length > 0 && (
        <div className="mt-2 text-center">
          {uniqueAddresses.map(
            (addressString, index) =>
              addressString && (
                <span
                  key={index}
                  className={`inline-block ${
                    addressColors[index % addressColors.length]
                  } rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}
                >
                  {addressString}
                </span>
              )
          )}
        </div>
      )}

      {profile.showEmailOnCard && profile.email && (
        <a
          href={`mailto:${profile.email}`}
          className="text-base flex items-center justify-center mt-2 hover:text-blue-600 transition-colors duration-200"
        >
          <FaEnvelope className="mr-2" /> {profile.email}
        </a>
      )}

      <div className="flex justify-center space-x-4 mt-4">
        {["instagram", "linkedin", "twitter", "facebook"].map(
          (platform) =>
            profile.contact[`${platform}_preferred`] && (
              <a
                key={platform}
                href={`https://www.${platform}.com/${
                  platform == "linkedin" ? "in/" : ""
                }${profile.contact[platform]}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${socialMediaColors[platform]} transition-colors duration-200 flex items-center justify-center w-8 h-8`}
              >
                {React.createElement(socialMediaIcons[platform], {
                  className: "w-5 h-5",
                })}
              </a>
            )
        )}
      </div>

      {biography && (
        <div className="mt-4 text-center w-full">
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <p className="italic bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            {biography}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserBasicInfo;
