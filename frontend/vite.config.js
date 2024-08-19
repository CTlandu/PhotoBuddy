import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // 这行确保 Vite 能正确处理 React 的 JSX 语法
  base: '/', // 基础路径
  build: {
    outDir: 'dist', // 输出目录
  },
  server: {
    port: 3000, // 开发服务器的端口
  },
  resolve: {
    alias: {
      '@': '/src', // 根据你的项目结构调整路径别名
    },
  },
});
