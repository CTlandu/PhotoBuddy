import React, { useEffect, useRef, useCallback } from "react";

const FeaturesVote = ({ userInfo }) => {
  const buttonRef = useRef(null);

  const handleClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.openFeatureRequestPopup) {
      window.openFeatureRequestPopup();
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://features.vote/widget/widget.js";
    script.async = true;
    script.setAttribute("slug", "photobuddies");

    if (userInfo) {
      if (userInfo.userId) script.setAttribute("user_id", userInfo.userId);
      if (userInfo.email) script.setAttribute("user_email", userInfo.email);
      if (userInfo.name) script.setAttribute("user_name", userInfo.name);
      if (userInfo.imgUrl) script.setAttribute("img_url", userInfo.imgUrl);
    }

    document.body.appendChild(script);

    script.onload = () => {
      if (buttonRef.current) {
        buttonRef.current.addEventListener("click", handleClick);
      }
    };

    return () => {
      document.body.removeChild(script);
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("click", handleClick);
      }
    };
  }, [handleClick]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        const closeButton = document.querySelector(".fv-close-button");
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <button
      className="btn bg-green-200 text-black hover:bg-green-300"
      ref={buttonRef}
      aria-haspopup="dialog"
    >
      Suggest a feature
    </button>
  );
};

export default FeaturesVote;
