import React from "react";
import { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Modal from "react-modal";
import axios from "axios";
import ImageUploader from "./ImageUploader";

const PortfolioForm = (props) => {
  // 判断当前显示哪一个form
  const [useModelForm, setUseModelForm] = useState(true);
  const [usePhotographerForm, setUsePhotographerForm] = useState(false);

  const [profile, setProfile] = useState(props.profile);

  // 模特信息
  const [modelBio, setModelBio] = useState(profile.model_info.model_bio || "");
  const [modelExperience, setModelExperience] = useState(
    profile.model_info.model_experience || ""
  );
  const [modelLookingFor, setModelLookingFor] = useState(
    profile.model_info.model_lookingfor || ""
  );

  // 摄影师信息
  const [photographerBio, setPhotographerBio] = useState(
    profile.photographer_info.photographer_bio || ""
  );
  const [photographerExperience, setPhotographerExperience] = useState(
    profile.photographer_info.photographer_experience || ""
  );
  const [photographerLookingFor, setPhotographerLookingFor] = useState(
    profile.photographer_info.photographer_lookingfor || ""
  );

  const [successMessage, setSuccessMessage] = useState("");

  // 获取model_image列表以及其长度
  const model_images = profile.model_info.model_images || [];

  // 获取photographer_image列表以及其长度
  const photographer_images =
    profile.photographer_info.photographer_images || [];

  const handleModelUploadImage = (newImage) => {
    const updatedImages = [...model_images, newImage];
    // 更新 profile 里的 model_images
    setProfile({
      ...profile,
      model_info: {
        ...profile.model_info,
        model_images: updatedImages, // 更新图片数组，包含新上传的图片
      },
    });
  };

  const handlePhotographerUploadImage = (newImage) => {
    const updatedImages = [...photographer_images, newImage];
    // 更新 profile 里的 photographer_images
    setProfile({
      ...profile,
      photographer_info: {
        ...profile.photographer_info,
        photographer_images: updatedImages, // 更新图片数组，包含新上传的图片
      },
    });
  };

  const handleDeleteModelImage = async (index) => {
    const updatedImages = model_images.filter((_, i) => i !== index); // 过滤掉被删除的图片

    try {
      const imageToDelete = model_images[index]; // 获取要删除的图片
      // 如果需要调用API删除服务器中的图片
      await axios.delete(
        `${import.meta.env.VITE_API_DOMAIN}/api/modelImageDelete`,
        {
          data: {
            id: profile.id,
            model_image: imageToDelete, // 指定要删除的图片
          },
        }
      );

      // 更新 React 状态，触发重新渲染
      setProfile({
        ...profile,
        model_info: {
          ...profile.model_info,
          model_images: updatedImages, // 使用过滤后的图片数组
        },
      });

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleDeletePhotographerImage = async (index) => {
    const updatedImages = photographer_images.filter((_, i) => i !== index); // 过滤掉被删除的图片

    try {
      const imageToDelete = photographer_images[index]; // 获取要删除的图片
      // 调用API删除服务器中的图片
      await axios.delete(
        `${import.meta.env.VITE_API_DOMAIN}/api/photographerImageDelete`, // 改为摄影师图片的API路径
        {
          data: {
            id: profile.id,
            photographer_image: imageToDelete, // 指定要删除的图片
          },
        }
      );

      // 更新 React 状态，触发重新渲染
      setProfile({
        ...profile,
        photographer_info: {
          ...profile.photographer_info,
          photographer_images: updatedImages, // 使用过滤后的图片数组
        },
      });

      console.log("Photographer image deleted successfully");
    } catch (error) {
      console.error("Error deleting photographer image:", error);
    }
  };

  //模特自我介绍
  const handleModelBioChange = (event) => {
    setModelBio(event.target.value);
  };

  // 处理Model Experience的输入变化
  const handleModelExperienceChange = (event) => {
    setModelExperience(event.target.value);
  };

  const handleModelLookingForChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    setModelLookingFor((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // 作为摄影师的自我介绍
  const handlePhotographerBioChange = (event) => {
    setPhotographerBio(event.target.value);
  };

  // 处理Photographer的输入变化
  const handlePhotographerExperienceChange = (event) => {
    setPhotographerExperience(event.target.value);
  };

  const handlePhotographerLookingForChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    setPhotographerLookingFor((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // 当用户点击提交模特BIO时，调用handleSaveModelBio函数
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      id: props.profile.id,
    };

    if (useModelForm) {
      data.model_info = {
        model_bio: modelBio,
        model_experience: modelExperience,
        model_lookingfor: modelLookingFor,
      };
    } else {
      data.photographer_info = {
        photographer_bio: photographerBio,
        photographer_experience: photographerExperience,
        photographer_lookingfor: photographerLookingFor,
      };
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_DOMAIN}/api/updateProfile`, // 使用统一的API路径
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      setSuccessMessage(
        `${useModelForm ? "Model" : "Photographer"} Info updated successfully!`
      );

      // 3秒后隐藏提示消息
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-gray p-6 w-full md:w-3/5 lg:w-2/3 shadow-md mx-auto rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-white">
        My Portfolio of...
      </h2>
      <div className="navbar m-0 w-full bg-gray-100 dark:bg-gray-800 flex rounded-md">
        <a
          className={`btn text-xl w-1/2 flex justify-center py-2 transition-colors duration-300 ${
            useModelForm
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-gray-500"
          }`}
          onClick={() => {
            setUseModelForm(true);
            setUsePhotographerForm(false);
          }}
        >
          Model
        </a>
        <a
          className={`btn text-xl w-1/2 flex justify-center py-2 transition-colors duration-300 ${
            usePhotographerForm
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-400 dark:hover:bg-gray-500"
          }`}
          onClick={() => {
            setUsePhotographerForm(true);
            setUseModelForm(false);
          }}
        >
          Photographer
        </a>
      </div>

      {useModelForm ? (
        <>
          <h2 className="text-base font-bold mb-4 text-center text-gray-600 dark:text-gray-400">
            Submit up to 9 photos to showcase your model experiences:
          </h2>
          <ImageUploader
            useModelForm={true}
            images={model_images}
            onDeleteImage={handleDeleteModelImage}
            onUploadImage={handleModelUploadImage}
            maxImages={9}
            profileId={profile.id}
            apiUrl={`${import.meta.env.VITE_API_DOMAIN}/api/modelImageUpload`}
          />
        </>
      ) : (
        <>
          <h2 className="text-base font-bold mb-4 text-center text-gray-600 dark:text-gray-400">
            Submit up to 9 photos to showcase your photographer experiences:
          </h2>
          <ImageUploader
            useModelForm={false}
            images={photographer_images}
            onDeleteImage={handleDeletePhotographerImage}
            onUploadImage={handlePhotographerUploadImage}
            maxImages={9}
            profileId={profile.id}
            apiUrl={`${
              import.meta.env.VITE_API_DOMAIN
            }/api/photographerImageUpload`}
          />
        </>
      )}

      <form onSubmit={handleSubmit}>
        {useModelForm && (
          <>
            <div className="mt-10">
              <h2 className="mb-5 font-bold text-black dark:text-white">
                Level of experience:
              </h2>
              <select
                className="select select-bordered w-full max-w-xs bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                value={modelExperience}
                onChange={handleModelExperienceChange}
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
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("Make friends & Network")}
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
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("Trade for Portfolio")}
                  className="checkbox border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2 text-black dark:text-white">
                  An experienced photographer (I'm willing to pay)
                </h3>
                <input
                  type="checkbox"
                  value="An experienced photographer"
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes(
                    "An experienced photographer"
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
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("Business Opportunity")}
                  className="checkbox border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-5 font-bold text-black dark:text-white">
                Introduce yourself as a model:
              </h2>
              <textarea
                className="textarea textarea-bordered textarea-md w-full bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Model Bio"
                value={modelBio}
                onChange={handleModelBioChange}
                maxLength={250}
              ></textarea>
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {modelBio.length}/{250} characters
              </div>
            </div>
          </>
        )}

        {usePhotographerForm && (
          <>
            <div className="mt-10">
              <h2 className="mb-5 font-bold text-gray-800 dark:text-gray-200">
                Level of experience:
              </h2>
              <select
                className="select select-bordered w-full max-w-xs bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                value={photographerExperience}
                onChange={handlePhotographerExperienceChange}
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
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes(
                    "Make friends & Network"
                  )}
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
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes(
                    "Trade for Portfolio"
                  )}
                  className="checkbox border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2 text-black dark:text-white">
                  A model with experiences
                </h3>
                <input
                  type="checkbox"
                  value="A model with experiences"
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes(
                    "A model with experiences"
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
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes(
                    "Business Opportunity"
                  )}
                  className="checkbox border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="mb-5 font-bold text-black dark:text-white">
                Introduce yourself as a Photographer:
              </h2>
              <textarea
                className="textarea textarea-bordered textarea-md w-full bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Photographer Bio"
                value={photographerBio}
                onChange={handlePhotographerBioChange}
                maxLength={250}
              ></textarea>
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {photographerBio.length}/{250} characters
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center">
          <button className="btn btn-primary mt-4 w-1/2" type="submit">
            {useModelForm ? "Save Model Info" : "Save Photographer Info"}
          </button>
        </div>

        {successMessage && (
          <div className="mt-4 text-green-500 dark:text-green-400 text-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default PortfolioForm;
