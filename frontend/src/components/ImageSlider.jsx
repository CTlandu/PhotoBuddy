import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';

export default function ImageSlider({ profile }) {
  // 添加一个 state 用来存储当前的图片 index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 定义 slider 的设置，确保在滑动时更新 currentIndex
  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => setCurrentIndex(index),
  };

  return (
    <div className="relative w-full overflow-hidden mt-4">
      {profile.model_info?.model_images && profile.model_info.model_images.length > 0 ? (
        <>
            <Slider {...settings} className="w-full"> {/** 设定 max-width */}
              {profile.model_info.model_images.map((image, index) => (
                <div key={index} className="w-full p-1">
                  <div className="w-full max-w-[70%] aspect-square relative rounded-lg overflow-hidden mx-auto">
                    <img
                      src={image}
                      alt={`Model Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>

          {/** index indicator */}
          <div className="text-center mt-2">
            <p>{currentIndex + 1} / {profile.model_info?.model_images.length}</p>
          </div>
        </>
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white rounded-full p-4 text-2xl hover:bg-blue-700 transition-colors duration-300 shadow-lg z-50"
      onClick={onClick}
    >
      &gt;
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white rounded-full p-4 text-2xl hover:bg-blue-700 transition-colors duration-300 shadow-lg z-50"
      onClick={onClick}
    >
      &lt;
    </button>
  );
}
