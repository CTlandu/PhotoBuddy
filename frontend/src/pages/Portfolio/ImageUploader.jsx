import React, { useRef, useState } from "react";
import Modal from "react-modal";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";

const ImageUploader = ({
  useModelForm,
  images,
  onDeleteImage,
  onUploadImage,
  maxImages,
  profileId,
  apiUrl,
}) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (images.length >= maxImages) {
      alert(`You have reached the maximum number of ${maxImages} images`);
      return;
    }

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsModalOpen(true);
    }
  };

  const handleSave = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const base64Image = canvas.toDataURL("image/jpeg"); // 保留完整的 Base64 数据

      try {
        let data = {
          id: profileId,
        };

        // 判断是模特图片还是摄影师图片，并相应地设置数据
        if (useModelForm) {
          data.model_image = base64Image; // 发送 model_image 数据
        } else {
          data.photographer_image = base64Image; // 发送 photographer_image 数据
        }

        // 确保 apiUrl 是根据表单类型来变化的（也可以直接根据 useModelForm 和 usePhotographerForm 来设置 URL）
        await axios.put(apiUrl, data, {
          headers: {
            "Content-Type": "application/json", // 保持 JSON 格式
          },
        });

        // 上传成功后，立即更新状态，添加新的图片到本地的图片数组中
        onUploadImage(base64Image);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setIsModalOpen(false); // 关闭模态框
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div className="relative w-full pb-[100%]" key={index}>
            <img
              src={image}
              alt={`portfolio-image-${index}`}
              className="absolute inset-0 h-full w-full object-cover rounded-lg"
            />
            <button
              onClick={() => onDeleteImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              x
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            className="relative bg-gray-200 dark:bg-gray-700 w-full pb-[100%] transform transition duration-300 ease-in-out hover:scale-95 active:scale-90"
            onClick={handleButtonClick}
          >
            <div className="absolute inset-0 h-full w-full object-cover rounded-lg flex justify-center items-center shadow-lg">
              <svg
                className="w-10 h-10 text-gray-600 dark:text-gray-300"
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
              <label
                htmlFor="scale"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
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
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="ml-2"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSave}
                className="bg-dark-gray text-black py-2 px-4 rounded hover:bg-blue-700"
              >
                Save Image
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageUploader;
