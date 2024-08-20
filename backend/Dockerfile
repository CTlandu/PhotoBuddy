# 使用官方的 node:18-alpine 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件，以安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的所有文件到容器中
COPY . .

# 暴露应用的端口
EXPOSE 4000

# 启动应用程序
CMD ["npm", "run", "dev"]
