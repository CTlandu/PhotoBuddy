# 第一阶段：构建阶段
# 使用官方的 node:18-alpine 作为基础镜像，轻量且包含 Node.js 环境
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）以安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的所有文件到容器中
COPY . .

# 运行构建命令，生成静态文件
RUN npm run build

# 调试：查看构建后的文件结构，确保生成的文件正确
RUN ls -l /app/dist

# 第二阶段：生产阶段
# 使用官方的 node:18-alpine 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制构建阶段生成的静态文件到生产镜像中
COPY --from=build /app/dist ./dist

# 安装 Express.js，用于提供静态文件
RUN npm install express serve-static

# 复制 Express.js 服务器文件
COPY server.js .

# 暴露端口 3000
EXPOSE 3000

# 启动 Express.js 服务器
CMD ["node", "server.js"]

