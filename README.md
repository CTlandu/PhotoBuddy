<<<<<<< HEAD
# PhotoBuddy
A MERN project for implementing PhotoBuddy, a startup website for connecting photographers/models
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refres

# PhotoBuddy

PhotoBuddy 是一个摄影师和模特之间的匹配和交流平台，基于 MERN Stack 开发。此项目分为前端（`frontend`）和后端（`backend`）两个部分，通过 Docker 容器化进行部署。

## 项目结构
PhotoBuddy/
│
├── backend/ # 后端代码，包含 API、数据库连接等
│
├── frontend/ # 前端代码，包含 React 组件和页面
│
├── docker-compose.yml # Docker Compose 配置文件，用于容器化部署
│
└── .gitignore # Git 忽略文件配置

## 使用说明

1. 使用 `docker-compose` 启动项目：
   用终端进入到./PhotoBuddy 目录下，运行以下命令：
   docker-compose up --build

2. 前端应用将运行在 http://localhost:3001(注意这里有个1，不是3000，之前为了测试端口改的)，后端 API 将运行在 http://localhost:4000。

>>>>>>> b15c1aa (set up Routers and login page)
