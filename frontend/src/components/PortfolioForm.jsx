import React from "react";
import { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Modal from "react-modal";
import axios from "axios";

const PortfolioForm = (props) => {

  // 判断当前显示哪一个form
  const [useModelForm,setUseModelForm] = useState(true);
  const [usePhotographerForm,setUsePhotographerForm] = useState(false);

  const [profile, setProfile] = useState(props.profile)

  // 模特信息
  const [modelBio, setModelBio] = useState(profile.model_info.model_bio || "");
  const [modelExperience, setModelExperience] = useState(profile.model_info.model_experience || "");
  const [modelLookingFor, setModelLookingFor] = useState(profile.model_info.model_lookingfor || "");

  // 摄影师信息
  const [photographerBio, setPhotographerBio] = useState(profile.photographer_info.photographer_bio || "");
  const [photographerExperience, setPhotographerExperience] = useState(profile.photographer_info.photographer_experience || "");
  const [photographerLookingFor, setPhotographerLookingFor] = useState(profile.photographer_info.photographer_lookingfor || "");

  const [successMessage, setSuccessMessage] = useState("");

  // 图片上传相关的State
  const [file, setFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  // 获取model_image列表以及其长度
  const model_images = profile.model_info.model_images || [];
  const numOfModelImages = model_images.length;


  // 获取photographer_image列表以及其长度
  const photographer_images = profile.photographer_info.photographer_images || [];
  const numOfPhotographerImages = photographer_images.length;

  // 用于引用隐藏的文件输入
  const fileInputRef = useRef(null);
  

  // 处理按钮点击，触发文件选择
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 处理文件选择
  const handleFileChange = (event) => {
    if (useModelForm && numOfModelImages >= 9) {
      alert("You have reached the maximum number of 9 model images");
      return;
    } else if (usePhotographerForm && numOfPhotographerImages >= 9) {
      alert("You have reached the maximum number of 9 photographer images");
      return;
    }

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsModalOpen(true); // 打开裁剪模态框
    }
  };

  // 处理裁剪后的图片保存
  const handleSave = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const base64Image = canvas.toDataURL("image/jpeg");

      try {
        if (useModelForm) {
          const data = {
            id: profile.id,
            model_image: base64Image,
          };
          await axios.put(`${import.meta.env.VITE_API_DOMAIN}/api/modelImageUpload`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const updatedImages = [...model_images, base64Image];
          setProfile({ ...profile, model_info: { ...profile.model_info, model_images: updatedImages } });
        } else if (usePhotographerForm) {
          const data = {
            id: profile.id,
            photographer_image: base64Image,
          };
          await axios.put(`${import.meta.env.VITE_API_DOMAIN}/api/photographerImageUpload`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const updatedImages = [...photographer_images, base64Image];
          setProfile({ ...profile, photographer_info: { ...profile.photographer_info, photographer_images: updatedImages } });
        }

        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setIsModalOpen(false); // 关闭模态框
    }
  };
  
  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  //处理照片删除
  const handleDeleteImage = async (index) => {
    try {
      if (useModelForm) {
        const imageToDelete = model_images[index];
        const updatedImages = model_images.filter((_, i) => i !== index);

        const data = {
          id: profile.id,
          model_image: imageToDelete, // 指定要删除的图片
        };

        // 发送删除请求到后端
        const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/api/modelImageDelete`, {
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Model image deleted successfully:', response.data);

        // 删除成功后，更新前端的图片列表
        setProfile({ ...profile, model_info: { ...profile.model_info, model_images: updatedImages } });
      } else if (usePhotographerForm) {
        const imageToDelete = photographer_images[index];
        const updatedImages = photographer_images.filter((_, i) => i !== index);

        const data = {
          id: profile.id,
          photographer_image: imageToDelete, // 指定要删除的图片
        };

        // 发送删除请求到后端
        const response = await axios.delete(`${import.meta.env.VITE_API_DOMAIN}/api/photographerImageDelete`, {
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Photographer image deleted successfully:', response.data);

        // 删除成功后，更新前端的图片列表
        setProfile({ ...profile, photographer_info: { ...profile.photographer_info, photographer_images: updatedImages } });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
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
        `${import.meta.env.VITE_API_DOMAIN}/api/updateProfile`,  // 使用统一的API路径
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
    <div className="bg-gray p-6 w-full md:w-3/5 lg:w-2/3 shadow-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Portfolio of...</h2>
      <div className="navbar m-0 w-full bg-white flex rounded-md">
        <a 
          className={`btn text-xl w-1/2 flex justify-center ${useModelForm ? 'bg-gray-300 text-black' : 'btn-ghost'}`} 
          onClick={() => { setUseModelForm(true); setUsePhotographerForm(false); }}>
            Model
        </a>
        <a 
          className={`btn text-xl w-1/2 flex justify-center ${usePhotographerForm ? 'bg-gray-300 text-black' : 'btn-ghost'}`}
          onClick={() => { setUsePhotographerForm(true); setUseModelForm(false); }}>
            Photographer
        </a>
      </div>
  
      <form onSubmit={handleSubmit}>
        {/* Model Form */}
        {useModelForm && (
          <>
            <h2 className="text-base font-bold mb-4 text-center text-gray-400">
              Submit up to 9 photos to showcase your model experiences:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {model_images ? (
                model_images.map((image, index) => (
                  <div className="relative w-full pb-[100%]" key={index}>
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover rounded-lg" />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 bg-red text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                ))
              ) : null}
  
              {numOfModelImages < 9 && (
                <button
                  type="button"
                  className="relative bg-dark-gray w-full pb-[100%] transform transition duration-300 ease-in-out hover:scale-95 active:scale-90"
                  onClick={handleButtonClick}
                >
                  <div className="absolute inset-0 h-full w-full object-cover rounded-lg flex justify-center items-center shadow-lg bg-gray-50">
                    <svg
                      className="w-10 h-10 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                      />
                    </svg>
                  </div>
                </button>
              )}
  
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Crop Image"
              className="flex justify-center items-center"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
              {file && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <AvatarEditor
                      ref={setEditor}
                      image={file}
                      width={250}
                      height={250}
                      border={50}
                      borderRadius={0}
                      color={[255, 255, 255, 0.6]}
                      scale={scale}
                      rotate={0}
                    />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <label htmlFor="scale" className="block text-gray-700 text-sm font-bold mb-2">
                      Zoom:
                    </label>
                    <input
                      type="range"
                      id="scale"
                      name="scale"
                      min="1"
                      max="2"
                      step="0.01"
                      value={scale}
                      onChange={handleScaleChange}
                      className="ml-2"
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={handleSave} className="bg-dark-gray text-black py-2 px-4 rounded hover:bg-blue-700">
                      Save Image
                    </button>
                  </div>
                </div>
              )}
            </Modal>
  
            <div className="mt-10">
              <h2 className="mb-5 font-bold">Level of experience:</h2>
              <select
                className="select select-bordered w-full max-w-xs"
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
              <h2 className="mb-5 font-bold">I am looking for:</h2>
              <div className="flex items-center">
                <h3 className="mr-2">Make friends & Network</h3>
                <input
                  type="checkbox"
                  value="Make friends & Network"
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("Make friends & Network")}
                  className="checkbox border-gray"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2">Trade for Portfolio (mutually free)</h3>
                <input
                  type="checkbox"
                  value="Trade for Portfolio"
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("Trade for Portfolio")}
                  className="checkbox border-gray"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2">An experienced photographer (I'm willing to pay)</h3>
                <input
                  type="checkbox"
                  value="An experienced photographer"
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("An experienced photographer")}
                  className="checkbox border-gray"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2">Business Opportunity</h3>
                <input
                  type="checkbox"
                  value="Business Opportunity"
                  onChange={handleModelLookingForChange}
                  checked={modelLookingFor.includes("Business Opportunity")}
                  className="checkbox border-gray"
                />
              </div>
            </div>
  
            <div className="mt-10">
              <h2 className="mb-5 font-bold">Introduce yourself as a model:</h2>
              <textarea
                className="textarea textarea-bordered textarea-md w-full"
                placeholder="Model Bio"
                value={modelBio}
                onChange={handleModelBioChange}
                maxLength={250}
              ></textarea>
              <div className="text-right text-sm text-gray-500">
                {modelBio.length}/{250} characters
              </div>
            </div>
          </>
        )}
  
        {/* Photographer Form */}
        {usePhotographerForm && (
          <>
            <h2 className="text-base font-bold mb-4 text-center text-gray-400">
              Submit up to 9 photos to showcase your photographer experiences:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photographer_images ? (
                photographer_images.map((image, index) => (
                  <div className="relative w-full pb-[100%]" key={index}>
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover rounded-lg" />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 right-2 bg-red text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                ))
              ) : null}
  
              {numOfPhotographerImages < 9 && (
                <button
                  type="button"
                  className="relative w-full pb-[100%] transform transition duration-300 ease-in-out hover:scale-95 active:scale-90"
                  onClick={handleButtonClick}
                >
                  <div className="absolute inset-0 h-full w-full object-cover rounded-lg flex justify-center items-center shadow-lg bg-gray-50">
                    <svg
                      className="w-10 h-10 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                      />
                    </svg>
                  </div>
                </button>
              )}
  
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
  
            <div className="mt-10">
              <h2 className="mb-5 font-bold">Level of experience:</h2>
              <select
                className="select select-bordered w-full max-w-xs"
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
              <h2 className="mb-5 font-bold">I am looking for:</h2>
              <div className="flex items-center">
                <h3 className="mr-2">Make friends & Network</h3>
                <input
                  type="checkbox"
                  value="Make friends & Network"
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes("Make friends & Network")}
                  className="checkbox border-gray"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2">Trade for Portfolio (mutually free)</h3>
                <input
                  type="checkbox"
                  value="Trade for Portfolio"
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes("Trade for Portfolio")}
                  className="checkbox border-gray"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2">A model with experiences</h3>
                <input
                  type="checkbox"
                  value="A model with experiences"
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes("A model with experiences")}
                  className="checkbox border-gray"
                />
              </div>
              <div className="flex items-center">
                <h3 className="mr-2">Business Opportunity</h3>
                <input
                  type="checkbox"
                  value="Business Opportunity"
                  onChange={handlePhotographerLookingForChange}
                  checked={photographerLookingFor.includes("Business Opportunity")}
                  className="checkbox border-gray"
                />
              </div>
            </div>
  
            <div className="mt-10">
              <h2 className="mb-5 font-bold">Introduce yourself as a Photographer:</h2>
              <textarea
                className="textarea textarea-bordered textarea-md w-full"
                placeholder="Photographer Bio"
                value={photographerBio}
                onChange={handlePhotographerBioChange}
                maxLength={250}
              ></textarea>
              <div className="text-right text-sm text-gray-500">
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
          <div className="mt-4 text-green text-center">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
  
};  

export default PortfolioForm;