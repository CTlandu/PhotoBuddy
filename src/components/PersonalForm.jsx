import React from "react";
import { useState,useEffect } from "react";
import Session from 'supertokens-auth-react/recipe/session';
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
    return isoString.split('T')[0];
  };

  const [formData, setFormData] = useState({
    id: props.profile.id || '', // 从 props 中获取用户 ID
    preferredName: props.profile.preferredName || '',
    lastName: props.profile.lastName || '',
    pronouns: props.profile.pronouns || '',
    email: props.profile.email || '',
    birthday: props.profile.birthday ? formatDate(props.profile.birthday) : '',
    zipcode: props.profile.zipcode || '',
    phone: props.profile.phone || '',
    instagram: props.profile.instagra || '',
    linkedin: props.profile.linkedin || '',
    twitter: props.profile.twitter || '',
    facebook: props.profile.facebook || '',
});

  useEffect(() => {
    setFormData({
      id: props.profile.id || '',
      preferredName: props.profile.preferredName || '',
      lastName: props.profile.lastName || '',
      pronouns: props.profile.pronouns || '',
      email: props.profile.email || '',
      birthday: props.profile.birthday ? formatDate(props.profile.birthday) : '',
      zipcode: props.profile.zipcode || '',
      phone: props.profile.phone || '',
      instagram: props.profile.instagram || '',
      linkedin: props.profile.linkedin || '',
      twitter: props.profile.twitter || '',
      facebook: props.profile.facebook || '',
    });
  }, [props.profile]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 发送请求到后端api
      const response = await axios.put('http://localhost:4000/profile', formData);
      console.log('Form data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleAvatarSave = (updatedProfile) => {
    props.onProfileUpdate(updatedProfile); // 通知父组件数据已更新
  };


  return ( 
    <div className="bg-white p-6 w-1/2 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Personal Info</h2>
        <div className="avatar flex justify-center">  
            <AvatarUpload profile={props.profile} onSave={handleAvatarSave}/>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          {/* 把三个信息并排显示 */}
          <div className="flex flex-row justify-between items-center">
            <div>
              <label htmlFor="preferredName" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                *Preferred Name
              </label>
              <input type="text" 
                    id="preferredName" 
                    value={formData.preferredName}
                    onChange={handleChange}
                    maxLength="20" // 限制输入长度为20个字符
                    className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                *Last Name
              </label>
              <input type="text"
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    maxLength="20" // 限制输入长度为20个字符
                    className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
            </div>
            <div>
              <label htmlFor="pronouns" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                Pronouns
              </label>
              <input type="text"
                    id="pronouns" 
                    value={formData.pronouns}
                    onChange={handleChange}
                    maxLength="10" // 限制输入长度为20个字符
                    className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              *Email
            </label>
            <input value={formData.email} type="text" id="email" readOnly className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Phone Number
            </label>
            <input value={formData.phone} 
                  type="text" 
                  id="phone"
                  onChange={handleChange}
                  maxLength={10}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>

          <div>
            <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Birthday
            </label>
            <input type="date"
                  id="birthday" 
                  value={formData.birthday}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>

          <div>
            <label htmlFor="zipcode" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Zipcode
            </label>
            <input type="number"
                  id="zipcode" 
                  value={formData.zipcode}
                  onChange={handleChange}
                  min="00501"
                  max="99950"
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>


          <h2 className="text-xl font-bold mt-8 text-center">Social Media</h2>

          <div>
            <label htmlFor="instagram" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Instagram
            </label>
            <input value={formData.instagram} 
                  type="url" 
                  id="instagram"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Linkedin
            </label>
            <input value={formData.linkedin} 
                  type="url" 
                  id="linkedin"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>
          <div>
            <label htmlFor="facebook" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Facebook
            </label>
            <input value={formData.facebook} 
                  type="url" 
                  id="facebook"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>
          <div>
            <label htmlFor="twitter" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              X
            </label>
            <input value={formData.twitter} 
                  type="url" 
                  id="twitter"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>

        </div>

    
        {/* Other input fields */}
        <div className="flex justify-center mt-4">
            <button type="submit" className="bg-dark-gray text-black py-2 px-4 rounded hover:bg-blue-700">
                Submit
            </button>
        </div>
        


      </form>
  </div>
  );
}

export default PersonalForm;