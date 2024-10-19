import React from "react";
import ProfileCard from "./ProfileCard";

const ProfileGrid = ({ profiles, selectedRole }) => {
  return (
    <div className="grid gap-6 mt-16 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {profiles.map((profile, index) => (
        <div key={index} className="p-2">
          <ProfileCard
            profile={profile}
            modal_index={`modal-${index}`}
            role={selectedRole}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;
