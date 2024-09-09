# PhotoBuddy
A Web Project using MERN (MongoDB,Express.js, React.js, Node.js) Stack, a startup website for connecting photographers/models, helping them find the right matches.
=======


PhotoBuddy 是一个摄影师和模特之间的匹配和交流平台，基于 MERN Stack 开发。此项目分为前端（`frontend`）和后端（`backend`）两个部分，通过 Docker 容器化进行部署。

## 项目整体结构
```
PhotoBuddy/
│
├── backend/ # 后端代码，包含 API、数据库连接等
│
├── frontend/ # 前端代码，包含 React 组件和页面
│
├── (重要).env.development # 开发环境的配置文件（给后端用的）
│
├── (不用管).env.production # 生产环境的配置文件 （给后端用的）
│
├── (重要)docker-compose.yml # Docker Compose 配置文件，用于容器化部署
│
├── (不用管)package.json #项目在Render(部署平台)上的配置文件
│
└── .gitignore # Git 忽略文件配置
```

## 使用说明

1. 确保本地已经下载docker，打开docker并成功登录。

   使用 `docker-compose` 启动项目：

   用终端进入到./PhotoBuddy 目录下，运行以下命令：
   docker-compose up --build

2. 前端应用将运行在 http://localhost:3001(注意这里有个1，不是3000，之前为了测试端口改的)，后端 API 将运行在 http://localhost:4000。

3. 打开浏览器，访问 http://localhost:3001，即可看到前端页面。

4. 打开浏览器，访问 http://localhost:4000/auth/dashboard，即可查看supertoken后端用户数据（需要用户名和密码）若不开发后端则用不太到这里。

## GitHub Collab 注意事项
1. master分支是项目主分支，请勿随意修改。
2. 开发新功能时，请fork dev分支并新建属于自己的分支，开发完成后合并到dev分支。
3. 每次准备开发前，先pull一下dev分支，避免代码冲突。


