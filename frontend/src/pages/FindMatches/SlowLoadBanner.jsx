import React, { useState } from "react";

export default function SlowLoadBanner() {
  const [isVisible, setIsVisible] = useState(true); // 用于控制 Banner 是否可见

  const handleClose = () => {
    setIsVisible(false); // 点击关闭按钮后隐藏 Banner
  };

  if (!isVisible) {
    return null; // 如果不可见，返回 null，不渲染任何内容
  }

  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 relative"
      role="alert"
    >
      <span className="font-bold">Please Note</span>
      <p>
        The <strong>FindMatches</strong> page may take a little longer to load
        (approximately 20 seconds) as we are currently using a free hosting
        service that requires a cold start. Thank you for your patience!
      </p>
      <button
        className="absolute top-0 right-0 m-2 text-yellow-700 hover:text-yellow-900"
        onClick={handleClose}
        aria-label="Close Banner"
      >
        &#10005; {/* 关闭按钮，显示“X” */}
      </button>
    </div>
  );
}
