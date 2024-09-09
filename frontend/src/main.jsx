
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Strict Mode用于开发模式，它会对组件内的副作用和异步请求进行警告。
  <React.StrictMode>
      <App />
  </React.StrictMode>
);