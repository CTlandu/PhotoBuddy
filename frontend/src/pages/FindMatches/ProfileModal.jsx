import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import UserBasicInfo from "./UserBasicInfo";
import ProfileImageSlider from "./ProfileImageSlider";

const ProfileModal = ({ profile, modal_index, role, calculateAge }) => {
  return (
    <dialog id={modal_index} className="modal">
      <div className="modal-box max-w-lg max-h-[90vh] relative">
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="btn btn-circle btn-sm">
            <FaHeart className="text-red-500" />
          </button>
          <button className="btn btn-circle btn-sm">
            <FaStar className="text-yellow-500" />
          </button>
        </div>
        <h2 className="text-2xl font-serif italic text-center mb-4">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <h1 className="text-3xl font-serif italic text-center mb-6">
          {profile.preferredName}
        </h1>

        <UserBasicInfo
          profile={profile}
          calculateAge={calculateAge}
          role={role}
        />

        <ProfileImageSlider profile={profile} role={role} />
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => document.getElementById(modal_index).close()}
      ></form>
    </dialog>
  );
};

export default ProfileModal;
