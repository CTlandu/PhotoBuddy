import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirectToAuth } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import { FaUserPlus, FaCopy, FaCheck } from "react-icons/fa";

const NoProfilesPrompt = ({ city, selectedRole }) => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    const doesSessionExist = await Session.doesSessionExist();
    if (doesSessionExist) {
      navigate("/profile");
    } else {
      redirectToAuth();
    }
  };

  const cityName = city.split(",")[0].trim(); // 只取城市名
  const shareMessage = `Hey! 📸 I found this cool platform for ${selectedRole}s called PhotoBuddy. They don't have any ${selectedRole}s in ${cityName} yet. You should check it out: ${
    import.meta.env.VITE_WEBSITE_DOMAIN
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        No Profiles Found in <span className="text-secondary">{cityName}</span>{" "}
        🔍
      </h2>
      <p className="text-xl mb-8 text-base-content">
        Be the pioneer! 🚀 Start your journey as the first{" "}
        <span className="font-semibold text-accent">{selectedRole}</span> in{" "}
        {cityName}.
      </p>
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-full bg-primary hover:bg-primary-focus text-primary-content font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        <FaUserPlus className="mr-2" />
        {Session.doesSessionExist()
          ? "Complete Your Profile"
          : "Register and Build Your Portfolio"}
      </button>

      <div className="mt-12 border-t border-base-300 pt-8">
        <h3 className="text-2xl font-semibold mb-4 text-base-content">
          Know any {selectedRole}s in {cityName}? 😊
        </h3>
        <p className="text-lg mb-6 text-base-content">
          Help grow the PhotoBuddy community! 🌱 Share this opportunity with
          your network.
        </p>
        <div className="bg-base-300 p-6 rounded-lg mb-6">
          <p className="text-sm text-base-content">{shareMessage}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-full bg-secondary hover:bg-secondary-focus text-secondary-content font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isCopied ? (
            <FaCheck className="mr-2" />
          ) : (
            <FaCopy className="mr-2" />
          )}
          {isCopied ? "Copied! 👍" : "Copy Message 📋"}
        </button>
      </div>
    </div>
  );
};

export default NoProfilesPrompt;
