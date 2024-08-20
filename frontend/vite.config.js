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
    
    /**你的vite.config.js看起来已经配置得不错，其中historyApiFallback: true是关键配置，
     * 它会确保Vite开发服务器在处理未找到的路由时返回index.html。但是，请注意，
     * 这个配置仅影响开发环境。如果你在生产中部署应用时遇到问题，它不会自动生效，取决于服务器的配置。 */
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
