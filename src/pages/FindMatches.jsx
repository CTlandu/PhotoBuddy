//初始化FindMatches.jsx
import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';

function FindMatches(){
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar/>
        <div className="flex mt-16 justify-center">
          <ProfileCard/>
        </div>


      </div>
    </>
  );
}

export default FindMatches;