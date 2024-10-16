import React from "react";

const SocialMedia = ({ contact, handleChange, handleCheckboxChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-8 text-center dark:text-white">
        Contact
      </h2>

      {/* Instagram */}
      <div>
        <label
          htmlFor="instagram"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          Instagram
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center w-full sm:w-3/4 mb-2 sm:mb-0">
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              https://www.instagram.com/
            </span>
            <input
              value={contact.instagram}
              type="text"
              name="contact.instagram"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your Instagram ID"
            />
          </div>
          <div className="flex items-center w-full sm:w-auto sm:ml-4">
            <label className="flex items-center cursor-pointer">
              <span className="font-bold mr-2 dark:text-white whitespace-nowrap">
                Show on Profile Card
              </span>
              <input
                type="checkbox"
                name="instagram_preferred"
                checked={contact.instagram_preferred}
                onChange={handleCheckboxChange}
                className="checkbox border-gray"
              />
            </label>
          </div>
        </div>
      </div>

      {/* LinkedIn */}
      <div>
        <label
          htmlFor="linkedin"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          LinkedIn
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center w-full sm:w-3/4 mb-2 sm:mb-0">
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              https://www.linkedin.com/in/
            </span>
            <input
              value={contact.linkedin}
              type="text"
              name="contact.linkedin"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your LinkedIn ID"
            />
          </div>
          <div className="flex items-center w-full sm:w-auto sm:ml-4">
            <label className="flex items-center cursor-pointer">
              <span className="font-bold mr-2 dark:text-white whitespace-nowrap">
                Show on Profile Card
              </span>
              <input
                type="checkbox"
                name="linkedin_preferred"
                checked={contact.linkedin_preferred}
                onChange={handleCheckboxChange}
                className="checkbox border-gray"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Facebook */}
      <div>
        <label
          htmlFor="facebook"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          Facebook
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center w-full sm:w-3/4 mb-2 sm:mb-0">
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              https://www.facebook.com/
            </span>
            <input
              value={contact.facebook}
              type="text"
              name="contact.facebook"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your Facebook ID or Username"
            />
          </div>
          <div className="flex items-center w-full sm:w-auto sm:ml-4">
            <label className="flex items-center cursor-pointer">
              <span className="font-bold mr-2 dark:text-white whitespace-nowrap">
                Show on Profile Card
              </span>
              <input
                type="checkbox"
                name="facebook_preferred"
                checked={contact.facebook_preferred}
                onChange={handleCheckboxChange}
                className="checkbox border-gray"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Twitter(X) */}
      <div>
        <label
          htmlFor="twitter"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          X
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center w-full sm:w-3/4 mb-2 sm:mb-0">
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              https://X.com/
            </span>
            <input
              value={contact.twitter}
              type="text"
              name="contact.twitter"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your Twitter Username"
            />
          </div>
          <div className="flex items-center w-full sm:w-auto sm:ml-4">
            <label className="flex items-center cursor-pointer">
              <span className="font-bold mr-2 dark:text-white whitespace-nowrap">
                Show on Profile Card
              </span>
              <input
                type="checkbox"
                name="twitter_preferred"
                checked={contact.twitter_preferred}
                onChange={handleCheckboxChange}
                className="checkbox border-gray"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
