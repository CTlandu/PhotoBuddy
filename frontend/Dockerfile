# 使用官方的 node:18-alpine 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）以安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的所有文件到容器中
COPY . .

# 暴露开发服务器的端口（通常为 3000 或 5173，Vite 默认端口为 5173）
EXPOSE 3001

# 启动 Vite 开发服务器
CMD ["npm", "run", "dev"]
