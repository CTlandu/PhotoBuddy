import React from "react";
import ProfileCard from "./ProfileCard";

const ProfileGrid = ({ profiles, selectedRole }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full">
      {profiles.map((profile, index) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          modal_index={`modal_${index}`}
          role={selectedRole}
        />
      ))}
    </div>
  );
};

export default ProfileGrid;
