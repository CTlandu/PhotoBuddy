import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfileImageSlider = ({ profile, role }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const roleInfo = profile[`${role}_info`] || {};
  const images = roleInfo[`${role}_images`] || [];

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

  if (images.length === 0) {
    return <p>No images to display.</p>;
  }

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="relative w-full overflow-hidden mt-4">
      <Slider ref={sliderRef} {...settings} className="w-full">
        {images.map((image, index) => (
          <div key={index} className="w-full p-1">
            <div className="w-full max-w-[70%] aspect-square relative rounded-lg overflow-hidden mx-auto">
              <img
                src={image}
                alt={`${role.charAt(0).toUpperCase() + role.slice(1)} Image ${
                  index + 1
                }`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="text-center mt-2">
        <p>
          {currentIndex + 1} / {images.length}
        </p>
      </div>
      <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer flex-shrink-0 ${
              index === currentIndex ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

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

export default ProfileImageSlider;
