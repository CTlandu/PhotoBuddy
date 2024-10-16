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
        <div className="flex items-center justify-between">
          <div className="flex items-center w-3/4">
            <span className="text-gray-500 dark:text-gray-400">
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
          <div className="flex items-center ml-4">
            <div className="font-bold mr-2 dark:text-white">
              Show on Profile Card
            </div>
            <input
              type="checkbox"
              name="instagram_preferred"
              checked={contact.instagram_preferred}
              onChange={handleCheckboxChange}
              className="checkbox border-gray"
            />
          </div>
        </div>
      </div>

      {/* LinkedIn, Facebook, Twitter 类似结构 */}
      {/** LinkedIn */}
      <div>
        <label
          htmlFor="linkedin"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          LinkedIn
        </label>
        <div className="flex items-center justify-between">
          {/* LinkedIn base URL and input */}
          <div className="flex items-center w-3/4">
            <span className="text-gray-500 dark:text-gray-400">
              https://www.linkedin.com/in/
            </span>
            <input
              value={contact.linkedin} // This should only hold the ID part, not the full URL
              type="text"
              name="contact.linkedin"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your LinkedIn ID"
            />
          </div>
          {/* Show on Profile Card */}
          <div className="flex items-center ml-4">
            <div className="font-bold mr-2 dark:text-white">
              Show on Profile Card
            </div>
            <input
              type="checkbox"
              name="linkedin_preferred"
              checked={contact.linkedin_preferred}
              onChange={handleCheckboxChange}
              className="checkbox border-gray"
            />
          </div>
        </div>
      </div>

      {/** Facebook */}
      <div>
        <label
          htmlFor="facebook"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          Facebook
        </label>
        <div className="flex items-center justify-between">
          {/* Facebook base URL and input */}
          <div className="flex items-center w-3/4">
            <span className="text-gray-500 dark:text-gray-400">
              https://www.facebook.com/
            </span>
            <input
              value={contact.facebook} // Only hold the Facebook ID or username
              type="text"
              name="contact.facebook"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your Facebook ID or Username"
            />
          </div>
          {/* Show on Profile Card */}
          <div className="flex items-center ml-4">
            <div className="font-bold mr-2 dark:text-white">
              Show on Profile Card
            </div>
            <input
              type="checkbox"
              name="facebook_preferred"
              checked={contact.facebook_preferred}
              onChange={handleCheckboxChange}
              className="checkbox border-gray"
            />
          </div>
        </div>
      </div>

      {/** Twitter(X) */}
      <div>
        <label
          htmlFor="twitter"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          X
        </label>
        <div className="flex items-center justify-between">
          {/* Twitter(X) base URL and input */}
          <div className="flex items-center w-3/4">
            <span className="text-gray-500 dark:text-gray-400">
              https://X.com/
            </span>
            <input
              value={contact.twitter} // Only holds the Twitter username
              type="text"
              name="contact.twitter"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              placeholder="Your Twitter Username"
            />
          </div>
          {/* Show on Profile Card */}
          <div className="flex items-center ml-4">
            <div className="font-bold mr-2 dark:text-white">
              Show on Profile Card
            </div>
            <input
              type="checkbox"
              name="twitter_preferred"
              checked={contact.twitter_preferred}
              onChange={handleCheckboxChange}
              className="checkbox border-gray"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
