import React from "react";

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="font-bold mr-5">Find:</div>
      <button
        className={`btn mr-5 ${
          selectedRole === "model" ? "btn-primary" : "btn-outline"
        }`}
        onClick={() => onRoleChange("model")}
      >
        Model
      </button>
      <button
        className={`btn ml-5 ${
          selectedRole === "photographer" ? "btn-primary" : "btn-outline"
        }`}
        onClick={() => onRoleChange("photographer")}
      >
        Photographer
      </button>
    </div>
  );
};

export default RoleSelector;
