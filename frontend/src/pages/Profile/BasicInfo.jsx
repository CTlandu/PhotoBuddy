import React from "react";

const BasicInfo = ({ formData, handleChange }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-row justify-between items-center">
        {/* First Name */}
        <div>
          <label
            htmlFor="preferredName"
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
          >
            *First Name
          </label>
          <input
            type="text"
            name="preferredName"
            value={formData.preferredName}
            onChange={handleChange}
            maxLength="20"
            className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
          >
            *Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            maxLength="20"
            className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
          />
        </div>

        {/* Pronouns */}
        <div>
          <label
            htmlFor="pronouns"
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
          >
            Pronouns
          </label>
          <input
            type="text"
            name="pronouns"
            value={formData.pronouns}
            onChange={handleChange}
            maxLength="10"
            className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
          />
        </div>
      </div>

      {/* Email, Birthday, Zipcode 等其他基本信息字段 */}
      <label
        htmlFor="email"
        className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
      >
        *Email
      </label>
      <input
        value={formData.email}
        type="text"
        name="email"
        readOnly
        className="border w-full rounded py-2 px-3 leading-tight bg-dark-gray mr-3 text-white"
      />

      <div>
        <label
          htmlFor="birthday"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          Birthday
        </label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray mr-3 text-white"
        />
      </div>

      <div>
        <label
          htmlFor="zipcode"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          Zipcode
        </label>
        <input
          type="number"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          min="00501"
          max="99950"
          className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
        >
          Area of Activity
        </label>
        <input
          type="number"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          min="00501"
          max="99950"
          className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
        />
      </div>
    </div>
  );
};

export default BasicInfo;
