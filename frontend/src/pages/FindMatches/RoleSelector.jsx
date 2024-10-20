import React from "react";

const RoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="flex items-center w-full sm:w-auto">
      <span className="font-bold mr-2 whitespace-nowrap">Find:</span>
      <div className="flex-grow flex justify-center sm:justify-start">
        <button
          className={`btn btn-sm mr-2 ${
            selectedRole === "model" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => onRoleChange("model")}
        >
          Model
        </button>
        <button
          className={`btn btn-sm ${
            selectedRole === "photographer" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => onRoleChange("photographer")}
        >
          Photographer
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
