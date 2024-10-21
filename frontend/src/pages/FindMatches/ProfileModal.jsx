import React from "react";
import { FaHeart, FaStar, FaTimes } from "react-icons/fa";
import UserBasicInfo from "./UserBasicInfo";
import ProfileImageSlider from "./ProfileImageSlider";

const ProfileModal = ({ profile, modal_index, role }) => {
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const closeModal = () => {
    document.getElementById(modal_index).close();
  };

  return (
    <dialog id={modal_index} className="modal">
      <div className="modal-box w-10/12 max-w-lg max-h-[80vh] relative p-4 sm:p-6">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute left-2 top-2"
        >
          <FaTimes />
        </button>
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="btn btn-circle btn-sm">
            <FaHeart className="text-red-500" />
          </button>
          <button className="btn btn-circle btn-sm">
            <FaStar className="text-yellow-500" />
          </button>
        </div>

        <div className="flex justify-center mt-8 sm:mt-4">
          <UserBasicInfo
            profile={profile}
            calculateAge={calculateAge}
            role={role}
          />
        </div>

        <ProfileImageSlider profile={profile} role={role} />
      </div>
      <form method="dialog" className="modal-backdrop" onClick={closeModal}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ProfileModal;
