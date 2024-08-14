import React from 'react';
import { useState,useEffect } from 'react';
import Session from 'supertokens-auth-react/recipe/session';
import axios from 'axios';



const ProfileCard = () => {

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profile.model_info.model_images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profile.model_info.model_images.length - 1 ? 0 : prevIndex + 1
    );
  };


  const fetchProfile = async () => {
    try {
        const userId = await Session.getUserId(); // 替换为实际的用户ID
        console.log("UserId:\n" + userId);
        const response = await axios.get(`http://localhost:4000/api/profile`, {
            params: { id: userId }
        });
        setProfile(response.data);
    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
  };


  //initiate use effect
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
    {loading ? null :
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className='h-96'>
        <img src={profile.model_info.model_images[2]}></img>
      </figure>
      <div className="card-body">
      <button className='btn btn-link' onClick={()=>document.getElementById("profileModal").showModal()}>See detail</button>
        <h2 className="card-title">
          {profile.preferredName}
          <div className="badge badge-secondary">{profile.model_info.model_images.length} photos</div>
        </h2>
        <p>Looking for: 
          <ul>
            {profile.model_info.model_lookingfor.map((string, index) => (
              <li key={index}><div className='badge badge-primary'>{string}</div></li>
            ))}
          </ul>
        </p>
        <p>Distance from you: <div className='badge badge-info'>1.4 miles</div></p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{profile.model_info.model_experience}</div>
          <div className="badge badge-outline">3 years</div>
        </div>
      </div>
    </div>
    }

    {/** Profile Modal */}
<dialog id="profileModal" className="modal">
  <div className="modal-box max-w-lg max-h-[90vh]">
    <div className="flex items-center space-x-6">
      {/* 头像部分 */}
      <div className="avatar">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={profile.avatar || 'https://via.placeholder.com/150'}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 个人信息部分 */}
      <div className="flex-1 bg-gray-200 p-4 rounded-lg">
        <p><strong>First name:</strong> {profile.firstName || 'Ziyi'}</p>
        <p><strong>Last name:</strong> {profile.lastName || 'Wu'}</p>
        <p><strong>Preferred name:</strong> {profile.preferredName || 'Sally'}</p>
        <p><strong>Pronouns:</strong> {profile.pronouns || 'she/her'}</p>
        <p><strong>Email:</strong> {profile.email || 'swu03@wm.edu'}</p>
        <p><strong>Birth:</strong> {profile.birthday || '04/10/2002'}</p>
        <p>{profile.location || 'Williamsburg, VA'}</p>
        <p><strong>Instagram:</strong> {profile.instagram || 'xxxxxx'}</p>
        <p>{profile.followers || '100'} followers {profile.following || '20'} following</p>
      </div>
    </div>

    {/* Carousel部分 */}
    {/* <div className="relative w-full overflow-hidden mt-4">
      <div
        className="flex transition-transform ease-in-out duration-300"
        style={{
          transform: `translateX(-${currentIndex * 50}%)`, // 每次移动50%，显示两张图片
          width: `${profile.model_info?.model_images.length * 50}%`, // 动态设置宽度
        }}
      >
        {profile.model_info?.model_images && profile.model_info.model_images.length > 0 ? (
          profile.model_info.model_images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/2 p-1" // 确保每次显示两张图片
            >
              <div className="w-1/3 aspect-square relative rounded-lg overflow-hidden"> 
                <img
                  src={image}
                  alt={`Model Image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectFit: 'cover', borderRadius: '8px' }} // 保持图片适应容器
                />
              </div>
            </div>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </div> */}

      {/* 左右滚动按钮 */}
      {/* <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 m-2"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 m-2"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div> */}
    <div className="carousel carousel-center rounded-box">
      <div className="carousel-item">
        <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Pizza" />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          alt="Pizza" />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
          alt="Pizza" />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
          alt="Pizza" />
      </div>
      <div className="carousel-item">
        <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Pizza" />
      </div>
      <div className="carousel-item">
        <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Pizza" />
      </div>
      <div className="carousel-item">
        <img
          src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
          alt="Pizza" />
      </div>
    </div>
     

        
    </div>

    <form method="dialog" className="modal-backdrop" onClick={() => document.getElementById("profileModal").close()}>
      <button className="btn">Close</button>
    </form>
  </dialog>



    </>
  );
}

export default ProfileCard;