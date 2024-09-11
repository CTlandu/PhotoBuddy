import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({ profile }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative w-full overflow-hidden mt-4">
      {profile.model_info?.model_images && profile.model_info.model_images.length > 0 ? (
        <Slider {...settings} className="w-full">
          {profile.model_info.model_images.map((image, index) => (
            <div key={index} className="w-full p-1">
              <div className="w-full aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Model Image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
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
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 m-2"
      onClick={onClick}
    >
      &gt;
    </button>
  );
}

function PrevArrow(props) {
  const { onClick, className } = props;
  return (
    <button
      className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 m-2 z-50 ${className}`}
      onClick={onClick}
    >
      &lt;
    </button>
  );
}
