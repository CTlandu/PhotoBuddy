import React from "react";
import { useState, useEffect, useRef } from "react";
import Session from 'supertokens-auth-react/recipe/session';
import axios from "axios";

const PortfolioForm = (props) => {

  // 判断当前显示哪一个form
  const [useModelForm,setUseModelForm] = useState(true);
  const [usePhotographerForm,setUsePhotographerForm] = useState(false);

  // 用于引用隐藏的文件输入
  const fileInputRef = useRef(null);
  

  // 处理按钮点击，触发文件选择
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 处理文件选择
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // 你可以在这里处理文件上传逻辑，例如发送文件到服务器
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

        <div>

        </div>

        

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="relative w-full pb-[100%]"> 
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
        </div>



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