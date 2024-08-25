import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-dark-gray p-6 rounded-lg shadow-lg max-w-md text-center">
          <p className="text-white">我们使用 Cookie 来改善您的浏览体验。继续浏览即表示您同意使用 Cookie。</p>
          <button
            onClick={handleAccept}
            className="mt-4 btn btn-success hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            接受
          </button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
