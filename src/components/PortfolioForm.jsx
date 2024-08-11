import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const PortfolioForm = (props) => {

  // 判断当前显示哪一个form
  const [useModelForm,setUseModelForm] = useState(true);
  const [usePhotographerForm,setUsePhotographerForm] = useState(false);

  const [profile, setProfile] = useState(props.profile)

  const [modelBio, setModelBio] = useState(profile.model_bio || "");
  const [photographerBio, setPhotographerBio] = useState(profile.photographer_bio || "");

  const [successMessage, setSuccessMessage] = useState("");

  
  
  // 获取model_image列表以及其长度
  const model_images = profile.model_images;
  const numOfModelImages = model_images ? model_images.length : 0;

  // 获取photographer_image列表以及其长度
  const photographer_images = profile.photographer_images;
  const numOfPhotographerImages = photographer_images ? photographer_images.length : 0;

  // 用于引用隐藏的文件输入
  const fileInputRef = useRef(null);
  

  // 处理按钮点击，触发文件选择
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 处理文件选择
  const handleFileChange = async (event) => {
    if (useModelForm && numOfModelImages >= 9) {
      alert("You have reached the maximum number of 9 model images");
      return;
    } else if (usePhotographerForm && numOfPhotographerImages >= 9) {
      alert("You have reached the maximum number of 9 photographer images");
      return;
    }
  
    const file = event.target.files[0];
    // 判断是否选择了文件
    if (file) {
      console.log("File selected");
  
      // 创建 Image 对象
      const img = new Image();
  
      // 将文件对象转换为 URL，使用canvas api
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        const maxWidth = 800;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;
  
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // 将 canvas 转换为 Blob 对象
        canvas.toBlob(async (blob) => {
          // 获取文件大小（以字节为单位）
          const fileSizeInBytes = blob.size;
          // 将字节转换为千字节（KB）
          const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2); // 保留两位小数
          
          console.log(`Uploaded file size: ${fileSizeInKB} KB`);
  
          // 将 Blob 转换为 Base64 编码
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64Image = reader.result;
  
            if (useModelForm) {
              const data = {
                id: profile.id,
                model_image: base64Image,
              };
  
              try {
                const response = await axios.put('http://localhost:4000/api/modelImageUpload', data, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
  
                console.log('User data updated successfully');
  
                const updatedImages = [...profile.model_images || [], base64Image];
                setProfile({ ...profile, model_images: updatedImages });
              } catch (error) {
                console.error('Error updating user data:', error);
              }
            } else if (usePhotographerForm) {
              const data = {
                id: profile.id,
                photographer_image: base64Image,
              };
  
              try {
                const response = await axios.put('http://localhost:4000/api/photographerImageUpload', data, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
  
                console.log('User data updated successfully');
  
                const updatedImages = [...profile.photographer_images || [], base64Image];
                setProfile({ ...profile, photographer_images: updatedImages });
              } catch (error) {
                console.error('Error updating user data:', error);
              }
            }
          };
          reader.readAsDataURL(blob); // 开始读取 Blob 对象并转换为 Base64 编码
        }, 'image/jpeg', 0.8); // 这里你可以设置压缩质量
      };
  
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  //处理照片删除
  const handleDeleteImage = async (index) => {
    try {
      // 判断用户正在填模特信息还是摄影师信息
      if (useModelForm){
        const imageToDelete = model_images[index];
      
        const data = {
          id: profile.id,
          model_image: imageToDelete
        };

        // 发送删除请求到后端
        const response = await axios.delete('http://localhost:4000/api/modelImageDelete', {
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Image deleted successfully:', response.data);

        // 删除成功后，更新前端的图片列表
        const updatedImages = model_images.filter((_, i) => i !== index);
        setProfile({ ...profile, model_images: updatedImages });
      }

      else if(usePhotographerForm){
        const imageToDelete = photographer_images[index];
      
        const data = {
          id: profile.id,
          photographer_image: imageToDelete
        };
        // 发送删除请求到后端
        const response = await axios.delete('http://localhost:4000/api/photographerImageDelete', {
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Image deleted successfully:', response.data);

        // 删除成功后，更新前端的图片列表
        const updatedImages = photographer_images.filter((_, i) => i !== index);
        setProfile({ ...profile, photographer_images: updatedImages });
      }

    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  //模特自我介绍
  const handleModelBioChange = (event) => {
    setModelBio(event.target.value);
  };

  // 作为摄影师的自我介绍
  const handlePhotographerBioChange = (event) => {
    setPhotographerBio(event.target.value);
  };

  // 当用户点击提交模特BIO时，调用handleSaveModelBio函数
  const handleSaveModelBio = async () => {
    try {
      const data = {
        id: profile.id,
        model_bio: modelBio,
      };

      const response = await axios.put("http://localhost:4000/api/modelBio", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Model Bio updated successfully:", response.data);
      setProfile({ ...profile, model_bio: modelBio });

      // 显示成功消息
      setSuccessMessage("Model Bio updated successfully!");

      // 3秒后隐藏提示消息
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // 3000毫秒，即3秒

    } catch (error) {
      console.error("Error updating model bio:", error);
    }
  };

  // 当用户点击提交摄影师BIO时，调用handleSavePhotographerBio函数
  const handleSavePhotographerBio = async () => {
    try {
      const data = {
        id: profile.id,
        photographer_bio: photographerBio,
      };

      const response = await axios.put("http://localhost:4000/api/photographerBio", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Photographer Bio updated successfully:", response.data);
      setProfile({ ...profile, photographer_bio: photographerBio });

      // 显示成功消息
      setSuccessMessage("Photographer Bio updated successfully!");

      // 3秒后隐藏提示消息
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // 3000毫秒，即3秒

    } catch (error) {
      console.error("Error updating photographer bio:", error);
    }
  };

  return ( 
    // <div className="bg-white p-6 w-full rounded-lg shadow-md">
    <div className="bg-white p-6 w-full md:w-3/5 lg:w-2/3  rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Portfolio of...</h2>
      <div className="navbar m-0 w-full bg-white flex">
        <a 
          className="btn btn-ghost text-xl w-1/2 flex justify-center" 
          onClick={() => {setUseModelForm(true); setUsePhotographerForm(false)}}>
            Model
        </a>
        <a 
          className="btn btn-ghost text-xl w-1/2 flex justify-center"
          onClick={() => {setUsePhotographerForm(true); setUseModelForm(false)}}>Photographer</a>
      </div>

      {/* 如果useModelForm === true，则正在使用useModelForm, 显示这段代码 */}
      {useModelForm && (
        <>
        <h2 className="text-3xl font-sans mb-4 ml-8 text-center text-purple-500">Model Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {model_images ? (model_images.map((image, index) => (
            <div className="relative w-full pb-[100%]" key={index}>
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover rounded-lg" />
              {/* 添加删除按钮 */}
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                x
              </button>
            </div>
            
          ))) : null}

          {/* 上传按钮 */}
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

          {/* 隐藏的文件输入 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
    
        </div>

        {/* Model Bio */}
        <div className="mt-10">
          <h2 className="mb-5">Introduce yourself as a model:</h2>
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
          <button className="btn btn-primary mt-4 w-full" onClick={handleSaveModelBio}>
            Save Model Bio
          </button>
          {/* 成功提示 */}
          {successMessage && (
            <div className="mt-4 text-green-500 text-center">
              {successMessage}
            </div>
          )}
        </div>
      </>
      )}
      



      {/* 如果usePhotographerForm === true，则正在使用usePhotographerForm, 显示这段代码 */}
      {usePhotographerForm && (
        <>
        <h2 className="text-3xl font-sans mb-4 ml-8 text-center text-purple-500">Photographer Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photographer_images ? (photographer_images.map((image, index) => (
            <div className="relative w-full pb-[100%]" key={index}>
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover rounded-lg" />
              {/* 添加删除按钮 */}
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                x
              </button>
            </div>
            
          ))) : null}

          {/* 上传按钮 */}
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

          {/* 隐藏的文件输入 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
    
        </div>

        {/* Photographer Bio */}
        <div className="mt-10">
          <h2 className="mb-5">Introduce yourself as a Photographer:</h2>
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
          <button className="btn btn-primary mt-4 w-full" onClick={handleSavePhotographerBio}>
            Save Photographer Bio
          </button>
          {/* 成功提示 */}
          {successMessage && (
            <div className="mt-4 text-green-500 text-center">
              {successMessage}
            </div>
          )}
        </div>
      </>
      )}
  </div>
  )
}

export default PortfolioForm;