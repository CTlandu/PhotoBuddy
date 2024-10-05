import React from "react";
import { useState, useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";
import AvatarUpload from "./AvatarUpload";

const PersonalForm = (props) => {
  /**
   * 格式化 ISO 字符串日期为 YYYY-MM-DD 格式的字符串
   *
   * @param isoString ISO 字符串日期
   * @returns 格式化后的 YYYY-MM-DD 字符串
   */
  const formatDate = (isoString) => {
    return isoString.split("T")[0];
  };

  const [formData, setFormData] = useState({
    id: props.profile.id || "", // 从 props 中获取用户 ID
    email: props.profile.email || "", // 从 props 中获取用户邮箱

    preferredName: props.profile.preferredName || "",
    lastName: props.profile.lastName || "",
    pronouns: props.profile.pronouns || "",
    birthday: props.profile.birthday ? formatDate(props.profile.birthday) : "",
    zipcode: props.profile.zipcode || "",

    // Contact - 使用安全的默认值
    contact: {
      phoneNumber: props.profile.contact.phoneNumber || "",
      instagram: props.profile.contact.instagram || "",
      linkedin: props.profile.contact.linkedin || "",
      twitter: props.profile.contact.twitter || "",
      facebook: props.profile.contact.facebook || "",

      phoneNumber_preferred:
        props.profile.contact.phoneNumber_preferred || false,
      instagram_preferred: props.profile.contact.instagram_preferred || false,
      linkedin_preferred: props.profile.contact.linkedin_preferred || false,
      twitter_preferred: props.profile.contact.twitter_preferred || false,
      facebook_preferred: props.profile.contact.facebook_preferred || false,
    },
  });

  useEffect(() => {
    setFormData({
      id: props.profile.id || "",
      preferredName: props.profile.preferredName || "",
      lastName: props.profile.lastName || "",
      pronouns: props.profile.pronouns || "",
      email: props.profile.email || "",
      birthday: props.profile.birthday
        ? formatDate(props.profile.birthday)
        : "",
      zipcode: props.profile.zipcode || "",

      // Contact
      contact: {
        phoneNumber: props.profile.contact.phoneNumber || "",
        instagram: props.profile.contact.instagram || "",
        linkedin: props.profile.contact.linkedin || "",
        twitter: props.profile.contact.twitter || "",
        facebook: props.profile.contact.facebook || "",

        phoneNumber_preferred:
          props.profile.contact.phoneNumber_preferred || false,
        instagram_preferred: props.profile.contact.instagram_preferred || false,
        linkedin_preferred: props.profile.contact.linkedin_preferred || false,
        twitter_preferred: props.profile.contact.twitter_preferred || false,
        facebook_preferred: props.profile.contact.facebook_preferred || false,
      },
    });
  }, [props.profile]);

  /**
   * 
   * 在你的 handleChange 函数中，有一个问题是 id 属性并不适用于 formData 中嵌套的对象（如 contact.phoneNumber 等）。
   * 目前你使用的是 id 直接映射到 formData，但是对于嵌套的字段如 contact 对象，这种方法会失败。
    你可以通过以下方式解决此问题：
    1. 更新 handleChange 函数
    需要根据 id 字段来正确更新嵌套对象中的值。可以使用 name 属性来区分不同的字段： 
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      if (name.includes(".")) {
        const [parentKey, childKey] = name.split(".");
        return {
          ...prevFormData,
          [parentKey]: {
            ...prevFormData[parentKey],
            [childKey]: value,
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  // 为复选框增加处理函数，更新 formData 中的状态：
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      contact: {
        ...prevFormData.contact,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 发送请求到后端api
      const response = await axios.put(
        `${import.meta.env.VITE_API_DOMAIN}/api/profile`,
        formData
      );
      console.log("Form data updated successfully:", response.data);
      window.location.reload(); // submit后重新加载页面
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleAvatarSave = (updatedProfile) => {
    props.onProfileUpdate(updatedProfile); // 通知父组件数据已更新
  };

  return (
    // <div className="bg-white p-6 w-full rounded-lg shadow-md">
    <div className="bg-white dark:bg-dark-gray p-6 w-full md:w-3/4 lg:w-2/3  rounded-lg shadow-md mx-auto">
      <h2 className="dark:text-white text-xl font-bold mb-4 text-center">
        Personal Info
      </h2>
      <div className="avatar flex justify-center">
        <AvatarUpload profile={props.profile} onSave={handleAvatarSave} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          {/* 把三个信息并排显示 */}
          <div className="flex flex-row justify-between items-center">
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
                maxLength="20" // 限制输入长度为20个字符
                className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              />
            </div>
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
                maxLength="10" // 限制输入长度为20个字符
                className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
              />
            </div>
          </div>

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

          <h2 className="text-xl font-bold mt-8 text-center dark:text-white ">
            Contact
          </h2>

          {/** Phone Number电话号码 */}
          {/* <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
            >
              Phone Number
            </label>
            <div className="flex items-center">
              <input
                value={formData.contact.phoneNumber}
                type="text"
                name="contact.phoneNumber"
                onChange={handleChange}
                maxLength={10}
                className="border w-full rounded py-2 px-3 leading-tight bg-dark-gray mr-3 text-white"
              />
              <div className="flex items-center">
                <div className="dark:text-white font-bold mr-2">
                  Show on Profile Card
                </div>
                <input
                  type="checkbox"
                  name="phoneNumber_preferred"
                  checked={formData.contact.phoneNumber_preferred}
                  onChange={handleCheckboxChange}
                  className="checkbox border-gray"
                />
              </div>
            </div>
          </div> */}

          {/** Instagram */}
          <div>
            <label
              htmlFor="instagram"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
            >
              Instagram
            </label>
            <div className="flex items-center justify-between">
              {/* Instagram base URL and input */}
              <div className="flex items-center w-3/4">
                <span className="text-gray-500 dark:text-gray-400">
                  https://www.instagram.com/
                </span>
                <input
                  value={formData.contact.instagram} // This should only hold the ID part, not the full URL
                  type="text"
                  name="contact.instagram"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
                  placeholder="Your Instagram ID"
                />
              </div>
              {/* Show on Profile Card */}
              <div className="flex items-center ml-4">
                <div className="font-bold mr-2 dark:text-white">
                  Show on Profile Card
                </div>
                <input
                  type="checkbox"
                  name="instagram_preferred"
                  checked={formData.contact.instagram_preferred}
                  onChange={handleCheckboxChange}
                  className="checkbox border-gray"
                />
              </div>
            </div>
          </div>

          {/** LinkedIn */}
          <div>
            <label
              htmlFor="linkedin"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
            >
              LinkedIn
            </label>
            <div className="flex items-center justify-between">
              {/* LinkedIn base URL and input */}
              <div className="flex items-center w-3/4">
                <span className="text-gray-500 dark:text-gray-400">
                  https://www.linkedin.com/in/
                </span>
                <input
                  value={formData.contact.linkedin} // This should only hold the ID part, not the full URL
                  type="text"
                  name="contact.linkedin"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
                  placeholder="Your LinkedIn ID"
                />
              </div>
              {/* Show on Profile Card */}
              <div className="flex items-center ml-4">
                <div className="font-bold mr-2 dark:text-white">
                  Show on Profile Card
                </div>
                <input
                  type="checkbox"
                  name="linkedin_preferred"
                  checked={formData.contact.linkedin_preferred}
                  onChange={handleCheckboxChange}
                  className="checkbox border-gray"
                />
              </div>
            </div>
          </div>

          {/** Facebook */}
          <div>
            <label
              htmlFor="facebook"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
            >
              Facebook
            </label>
            <div className="flex items-center justify-between">
              {/* Facebook base URL and input */}
              <div className="flex items-center w-3/4">
                <span className="text-gray-500 dark:text-gray-400">
                  https://www.facebook.com/
                </span>
                <input
                  value={formData.contact.facebook} // Only hold the Facebook ID or username
                  type="text"
                  name="contact.facebook"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
                  placeholder="Your Facebook ID or Username"
                />
              </div>
              {/* Show on Profile Card */}
              <div className="flex items-center ml-4">
                <div className="font-bold mr-2 dark:text-white">
                  Show on Profile Card
                </div>
                <input
                  type="checkbox"
                  name="facebook_preferred"
                  checked={formData.contact.facebook_preferred}
                  onChange={handleCheckboxChange}
                  className="checkbox border-gray"
                />
              </div>
            </div>
          </div>

          {/** Twitter(X) */}
          <div>
            <label
              htmlFor="twitter"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2 mt-2"
            >
              X
            </label>
            <div className="flex items-center justify-between">
              {/* Twitter(X) base URL and input */}
              <div className="flex items-center w-3/4">
                <span className="text-gray-500 dark:text-gray-400">
                  https://X.com/
                </span>
                <input
                  value={formData.contact.twitter} // Only holds the Twitter username
                  type="text"
                  name="contact.twitter"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white"
                  placeholder="Your Twitter Username"
                />
              </div>
              {/* Show on Profile Card */}
              <div className="flex items-center ml-4">
                <div className="font-bold mr-2 dark:text-white">
                  Show on Profile Card
                </div>
                <input
                  type="checkbox"
                  name="twitter_preferred"
                  checked={formData.contact.twitter_preferred}
                  onChange={handleCheckboxChange}
                  className="checkbox border-gray"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Other input fields */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-dark-gray dark:bg-gray-400 text-white py-2 px-4 rounded hover:bg-blue-300 dark:hover:bg-green-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalForm;
