import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import emtpyAvatar from '../assets/empty_avatar.jpg';

Modal.setAppElement('#root'); // 设置根元素，防止辅助技术焦点陷阱

function AvatarUpload({profile, onSave}) {
  const [file, setFile] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsModalOpen(true); // 打开模态框
  };

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleSave = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const base64Image = canvas.toDataURL('image/jpeg');

      const data = {
        id: profile.id,
        avatar: base64Image,
      };

      try {
        const response = await axios.put('http://localhost:4000/api/profile', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('User data updated successfully:', response.data);
        onSave(response.data.user); // 通知父组件数据已更新

      } catch (error) {
        console.error('Error updating user data:', error);
      }
      setIsModalOpen(false); // 关闭模态框
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4 relative">
          <div className="avatar flex justify-center cursor-pointer relative group" onClick={handleClick}>
            <div className="w-24 rounded-full scale-125 overflow-hidden">
              <img
                src={profile.avatar || emtpyAvatar}
                alt="Avatar"
                className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:blur-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-75 ease-in-out group-hover:opacity-100">
                <span className="text-white font-bold">Upload</span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </form>

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
                borderRadius={125}
                color={[255, 255, 255, 0.6]} // RGBA
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
              <button type="button" onClick={handleSave} className="bg-dark-gray text-black py-2 px-4 rounded hover:bg-blue-700">
                Save Avatar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AvatarUpload;