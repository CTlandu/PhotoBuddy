import React from "react";
import { useState, useEffect, useRef } from "react";
import Session from 'supertokens-auth-react/recipe/session';
import axios from "axios";

const PortfolioForm = (props) => {

  // 判断当前显示哪一个form
  const [useModelForm,setUseModelForm] = useState(true);
  const [usePhotographerForm,setUsePhotographerForm] = useState(false);
  const [profile, setProfile] = useState(props.profile)
  
  
  // 获取model_image列表以及其长度
  const images = profile.model_images;
  const numOfImages = images ? images.length : 0;

  // 用于引用隐藏的文件输入
  const fileInputRef = useRef(null);
  

  // 处理按钮点击，触发文件选择
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 处理文件选择
  const handleFileChange = async (event) => {
    // 查看用户是否已经有9张图片了
    if (numOfImages >= 9) {
      alert("You have reached the maximum number of 9 images");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      console.log("File selected");

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
          img.src = e.target.result;
      };

      img.onload = async () => {
          // 创建一个 canvas 元素
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // 设置 canvas 的宽高，这里假设你想压缩到宽 800px，高度按比例缩放
          const maxWidth = 800;
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          // 将图像绘制到 canvas 上
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 将 canvas 内容转换为 base64 编码的图像
          const base64Image = canvas.toDataURL('image/jpeg', 0.8); // 0.8 为压缩质量，可根据需要调整

          // 创建要发送的数据
          const data = {
              id: profile.id,
              model_image: base64Image // 只上传当前选择的单个图像
          };

          try {
            const response = await axios.put('http://localhost:4000/api/modelImageUpload', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('User data updated successfully');

            // 更新前端的图片列表
            const updatedImages = [...images, base64Image];
            setProfile({ ...profile, model_images: updatedImages });

            // 打印压缩后的图片大小
            console.log('Compressed Image Size:', Math.round(base64Image.length * (3/4) / 1024) + ' KB');

          } catch (error) {
              console.error('Error updating user data:', error);
          }
      };

        // 读取文件内容
      reader.readAsDataURL(file);
    }
};

//处理照片删除
const handleDeleteImage = async (index) => {
  try {
    const imageToDelete = images[index];
    
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
    const updatedImages = images.filter((_, i) => i !== index);
    setProfile({ ...profile, model_images: updatedImages });

  } catch (error) {
    console.error('Error deleting image:', error);
  }
};



  return ( 
    // <div className="bg-white p-6 w-full rounded-lg shadow-md">
    <div className="bg-white p-6 w-full md:w-3/5 lg:w-2/3  rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Portfolio of...</h2>
      <div className="navbar m-0 w-full bg-white flex">
        <a className="btn btn-ghost text-xl w-1/2 flex justify-center">Model</a>
        <a className="btn btn-ghost text-xl w-1/2 flex justify-center">Photographer</a>
      </div>

      <h2 className="text-lg font-sans mb-4 text-left ml-8"> Gallery</h2>


        

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">


        {images ? (images.map((image, index) => (
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


        {/* <div className="relative w-full pb-[100%]"> 
          <img 
            className="absolute inset-0 h-full w-full object-cover rounded-lg" 
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" 
            alt="" 
          />
        </div>
        <div className="relative w-full pb-[100%]"> 
          <img 
            className="absolute inset-0 h-full w-full object-cover rounded-lg" 
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" 
            alt="" 
          />
        </div> */}



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


    
        {/* Other input fields */}
        {/* <div className="flex justify-center mt-4">
            <button type="btn" className="bg-dark-gray text-black py-2 px-4 rounded btn-ghost">
                Save
            </button>
        </div> */}
        

  </div>
  );
}

export default PortfolioForm;