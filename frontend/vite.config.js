import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

// 根据模式加载正确的 .env 文件
dotenvConfig({ path: path.resolve(__dirname, '../.env.' + process.env.NODE_ENV) });

// 打印加载的环境变量，确保它们已正确加载
// console.log('Loaded environment variables:', process.env);

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
