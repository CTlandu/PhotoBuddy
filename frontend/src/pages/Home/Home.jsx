import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import IntroBlock from "./IntroBlock";
import Carousel from "./Carousel";

function Home({ token }) {
  return (
    <>
      <div className="top-0 left-0 w-full z-50">
        <Navbar token={token} />
      </div>

      <div className="flex justify-center bg-base-200">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <IntroBlock />
        </div>
      </div>

      {/* <Carousel></Carousel> */}
      <div className="text-center mt-8">
        <p className="text-gray-500">
          &copy; 2024 PhotoBuddy. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Home;
