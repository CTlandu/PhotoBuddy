import React from "react";
import HeroImage from "../assets/hero_img.jpg"
import { redirectToAuth } from "supertokens-auth-react";



const IntroBlock = () => {
  async function onLogin(){
    redirectToAuth();
  }

  return (
    
    <>
      <div className="hero bg-base-200 px-6 lg:px-24 pt-14 pb-14">
        <div className="hero-content flex flex-col lg:flex-row items-center justify-center">
          <div className=" text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold">
            Connect, Create, Collaborate: Elevate Your Portfolio
            </h1>
            <p className="py-6 text-base lg:text-lg">
            Find Your Perfect Creative Match at <b className="text-pink-white">PhotoBuddy</b>
            </p>
            <button className="btn btn-primary mx-1" onClick={onLogin}> Sign Up</button>
            <button className="btn bg-pink-white mx-1"><a href="/about">Learn More (Click me!)</a></button>
          </div>
          <img
            src={HeroImage}
            className="w-full max-w-xs lg:max-w-sm rounded-lg shadow-2xl mb-6 lg:mb-0"
            alt="Hero"
          />
        </div>
      </div>
    </>
  );
};

export default IntroBlock;