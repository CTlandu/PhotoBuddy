import React from "react";

// initialize Carousel.jsx
const Carousel = () => {
  return (
    <div className="carousel flex items-center justify-center h-screen">
      <div className="carousel rounded-box">
        <div className="carousel-item m-3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            alt="Burger" />
        </div>
        <div className="carousel-item m-3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Burger" />
        </div>
        <div className="carousel-item m-3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Burger" />
        </div>
        <div className="carousel-item m-3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Burger" />
        </div>
      </div>
    </div>
  );
};
export default Carousel;