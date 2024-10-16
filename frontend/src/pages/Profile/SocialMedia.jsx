import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const SocialMedia = ({ contact, handleChange, handleCheckboxChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    instagram: false,
    linkedin: false,
    facebook: false,
    twitter: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSocialMediaSection = (name, label, url, placeholder, Icon) => {
    return (
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection(name)}
        >
          <div className="flex items-center">
            <Icon className="text-2xl mr-2" />
            <label className="block text-gray-700 dark:text-white text-sm font-bold">
              {label}
            </label>
          </div>
          {expandedSections[name] ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
          )}
        </div>
        {expandedSections[name] && (
          <div className="mt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center w-full sm:w-2/3 mb-2 sm:mb-0">
                <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mr-2">
                  {url}
                </span>
                <input
                  value={contact[name]}
                  type="text"
                  name={`contact.${name}`}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
                  placeholder={placeholder}
                />
              </div>
              <div className="flex items-center w-full sm:w-1/3 sm:justify-end">
                <label className="flex items-center cursor-pointer">
                  <span className="font-bold mr-2 dark:text-white whitespace-nowrap">
                    Show on Profile Card
                  </span>
                  <input
                    type="checkbox"
                    name={`${name}_preferred`}
                    checked={contact[`${name}_preferred`]}
                    onChange={handleCheckboxChange}
                    className="checkbox border-gray"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto">
      {/* <h2 className="text-xl font-bold mt-8 mb-4 text-center dark:text-white">
        Social Media
      </h2> */}

      {renderSocialMediaSection(
        "instagram",
        "Instagram",
        "instagram.com/",
        "Your Instagram ID",
        FaInstagram
      )}
      {renderSocialMediaSection(
        "linkedin",
        "LinkedIn",
        "linkedin.com/in/",
        "Your LinkedIn ID",
        FaLinkedin
      )}
      {renderSocialMediaSection(
        "facebook",
        "Facebook",
        "facebook.com/",
        "Your Facebook ID or Username",
        FaFacebook
      )}
      {renderSocialMediaSection(
        "twitter",
        "X",
        "X.com/",
        "Your Twitter Username",
        FaTwitter
      )}
    </div>
  );
};

export default SocialMedia;
