import React from "react";

const ExperienceForm = ({
  experienceLevel,
  lookingFor,
  bio,
  handleExperienceChange,
  handleLookingForChange,
  handleBioChange,
  isModel,
}) => {
  return (
    <>
      <div className="mt-10">
        <h2 className="mb-5 font-bold text-black dark:text-white">
          Level of experience:
        </h2>
        <select
          className="select select-bordered w-full max-w-xs bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          value={experienceLevel}
          onChange={handleExperienceChange}
        >
          <option value="">Select your experience</option>
          <option value="I just started!">I just started!</option>
          <option value="< 1 year">&lt; 1 year</option>
          <option value="1 - 3 years">1 - 3 years</option>
          <option value="I'm a professional">I'm a professional</option>
        </select>
      </div>

      <div className="mt-10">
        <h2 className="mb-5 font-bold text-black dark:text-white">
          I am looking for:
        </h2>
        <div className="flex items-center">
          <h3 className="mr-2 text-black dark:text-white">
            Make friends & Network
          </h3>
          <input
            type="checkbox"
            value="Make friends & Network"
            onChange={handleLookingForChange}
            checked={lookingFor.includes("Make friends & Network")}
            className="checkbox border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center">
          <h3 className="mr-2 text-black dark:text-white">
            Trade for Portfolio (mutually free)
          </h3>
          <input
            type="checkbox"
            value="Trade for Portfolio"
            onChange={handleLookingForChange}
            checked={lookingFor.includes("Trade for Portfolio")}
            className="checkbox border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center">
          <h3 className="mr-2 text-black dark:text-white">
            {isModel
              ? "An experienced photographer (I'm willing to pay)"
              : "A model with experiences"}
          </h3>
          <input
            type="checkbox"
            value={
              isModel
                ? "An experienced photographer"
                : "A model with experiences"
            }
            onChange={handleLookingForChange}
            checked={lookingFor.includes(
              isModel
                ? "An experienced photographer"
                : "A model with experiences"
            )}
            className="checkbox border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="flex items-center">
          <h3 className="mr-2 text-black dark:text-white">
            Business Opportunity
          </h3>
          <input
            type="checkbox"
            value="Business Opportunity"
            onChange={handleLookingForChange}
            checked={lookingFor.includes("Business Opportunity")}
            className="checkbox border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-5 font-bold text-black dark:text-white">
          {isModel
            ? "Introduce yourself as a model:"
            : "Introduce yourself as a photographer:"}
        </h2>
        <textarea
          className="textarea textarea-bordered textarea-md w-full bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          placeholder={isModel ? "Model Bio" : "Photographer Bio"}
          value={bio}
          onChange={handleBioChange}
          maxLength={250}
        ></textarea>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
          {bio.length}/{250} characters
        </div>
      </div>
    </>
  );
};

export default ExperienceForm;
