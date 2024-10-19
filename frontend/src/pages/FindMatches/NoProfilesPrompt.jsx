import React from "react";
import { useNavigate } from "react-router-dom";
import { redirectToAuth } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";

const NoProfilesPrompt = ({ city }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const doesSessionExist = await Session.doesSessionExist();
    if (doesSessionExist) {
      // 用户已登录，导航到个人资料页面
      navigate("/profile");
    } else {
      // 用户未登录，导航到登录页面
      redirectToAuth();
    }
  };

  return (
    <div className="text-center mt-16">
      <p className="text-xl mb-4">There's no profile found here in {city}.</p>
      <p className="text-lg mb-4">Would you like to be the 1st one?</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {Session.doesSessionExist()
          ? "Complete Your Profile"
          : "Register and Build Your Portfolio"}
      </button>
    </div>
  );
};

export default NoProfilesPrompt;
