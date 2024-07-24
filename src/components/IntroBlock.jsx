import React from "react";


const IntroBlock = () => {
  return (
    
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Your Photography/Model Career Starts Here</h1>
            <p className="py-6">
              What you would expect at PhotoBuddy
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroBlock;