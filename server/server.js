require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
// bcrypt 将用户的明文密码转换为一个加密的哈希值。这个哈希值是不可逆的，即无法从哈希值直接还原出原始密码。
//当用户尝试登录时，bcrypt 可以将用户输入的明文密码与存储在数据库中的哈希值进行比较，判断密码是否正确。
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require database connection
const dbConnect = require('./db/dbConnect');
const User = require("./db/userModel");
// 老的auth模块
// const auth = require('./auth');
// const { auth } = require("express-oauth2-jwt-bearer");

const cors = require("cors");
const {middleware} = require("supertokens-node/framework/express");

// // import supertoken packages
const supertokens =require("supertokens-node");
// const Session = require("supertokens-node/recipe/session");
// const EmailPassword = require("supertokens-node/recipe/emailpassword");
// const EmailVerification = require("supertokens-node/recipe/emailverification");
// const ThirdParty = require("supertokens-node/recipe/thirdparty");
const { errorHandler } = require("supertokens-node/framework/express");
// const Dashboard = require("supertokens-node/recipe/dashboard");
// const { verifySession } = require("supertokens-node/recipe/session/framework/express");
// const { SessionRequest } = require("supertokens-node/framework/express");
const supertokensInit = require("./supertokensInit");

dbConnect();

supertokensInit();

// express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
  origin: "http://localhost:5173",
  allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
}));

// IMPORTANT: CORS should be before the below line.
app.use(middleware());




/**
 * CORS 是一种机制，允许来自一个域的网页能够请求另一个域的资源。它通过添加一些特定的 HTTP 头来告诉浏览器允许来自不同源的请求。
 * CORS 主要用于解决浏览器的同源策略（Same-Origin Policy）限制的问题，这一策略是为了保护用户免受某些类型的攻击（例如 CSRF）。
 * 
同源策略（Same-Origin Policy）
同源策略规定，浏览器只能在同一个源（协议、域名和端口号均相同）下访问资源。具体来说，同源策略限制了一些类型的跨域 HTTP 请求，例如 AJAX 请求。
如果网页试图请求不同源的资源，浏览器将默认阻止这些请求。

CORS 通过设置服务器响应中的 HTTP 头来告诉浏览器允许特定源的请求。这些头包括：
Access-Control-Allow-Origin
Access-Control-Allow-Headers
Access-Control-Allow-Methods
 * 
这段代码是为了在Express应用中设置CORS头部，从而允许来自不同源的请求访问你的服务器资源。这样可以绕过同源策略，实现跨域访问。
 */
app.use((req, res, next) => {
  // 允许来自所有域的请求
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // 允许客户端使用这些头部字段
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // 允许客户端使用这些HTTP方法
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
})


// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on http://localhost/${port}`);
});

// app.post("/like-comment", verifySession(), (req, res) => {
//   let userId = req.session.getUserId();
//   console.log(111)
//   console.log(userId);
// });

// async function getUserInfo(){
//   let userInfo = await supertokens.listUsersByAccountInfo(
//     "public",{
//       email: "jizhoutang@outlook.com"
//     }
//   )
//   return userInfo[0].emails[0];
// }
// // 使用异步函数来获取结果
// async function fetchUserInfo() {
//   const userInfo = await getUserInfo();
//   console.log("jizhoutang user info: ", userInfo);
// }

// fetchUserInfo();

// 用户注册时的后端API，用于把新用户的数据(id, email)传入MongoDB数据库
app.post('/api/saveUserInfo', async (req, res) => {
  const userInfo = req.body;
  try {
      const newUser = new User(userInfo);
      await newUser.save();
      console.log('User information saved:', userInfo);
      res.status(200).send('User information saved successfully');
  } catch (error) {
      console.error('Error saving user information:', error);
      res.status(500).send('Internal server error');
  }
});

// 用户进入profile page时的get API
app.get('/profile', async (req, res) => {
  try{
    const userId = req.query.id// 假设通过查询参数传递用户ID
    const user = await User.findOne({ id: userId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
  }
);

/// 处理 PUT 请求，更新用户数据
app.put('/profile', async (req, res) => {
  try {
      const { id, preferredName, lastName, pronouns, email, birthday, zipcode } = req.body;

      // 检查必填字段是否缺失
      if (!id) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      // 更新用户信息
      const updatedUser = await User.findOneAndUpdate(
          { id },
          { preferredName, lastName, pronouns, email, birthday, zipcode },
          { new: true, runValidators: true } // 返回更新后的文档，并运行验证器
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user data:', error);

      // 检查是否是唯一性约束错误
      if (error.name === 'MongoServerError' && error.code === 11000) {
          return res.status(409).json({ message: 'Email or ID already exists' });
      }

      res.status(500).json({ message: 'Internal server error' });
    }
});

// create a "register" endpoint
app.post('/register', (request, response) => {
  // hash the password before saving the email and password into the database
  // The code below is telling bcrypt to hash the password received from request body 10 times or 10 salt rounds.
  try{
    let userId = request.session.getUserId();
    console.log('userId', userId);
    console.log("wtf");
  } catch {
    console.log("wtf2");
  }
  bcrypt.hash(request.body.password, 10)
    // In the then block, save the data you have now. Create a new instance of the userModel and collect the updated data:
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the user to the database, with feedback to the client.
      user.save().then((result) => {
        response.status(201).send({
          message: "User created Successfully用户注册成功",
          result,
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: "Error creating user用户创建失败",
          error,
        })
      })

    })
    // catch errors
    .catch((e) => {
      response.status(500).json({
        message: "密码哈希失败",
        e: e.message,
      });
      console.log(e);
    })
});

// create a "login" endpoint
app.post("/login",(request,response) => {
  // Check if the email that the user entered is in the database.
  User.findOne({email: request.body.email})
    // if successfully found, compare the password entered by the user with the one in the database.
    .then((user) => {
      bcrypt.compare(request.body.password, user.password)
      // to see if the passwords match
      .then((passwordChecked) => {
        if(!passwordChecked){
          return response.status(401).send({
            message: "密码错误1",
          })
        }
        // create a JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: '1h'}
        );
        // return success response
        response.status(201).send({
          message: "登录成功",
          email: user.email,
          token,
        });
      })
      .catch((error) => {
        response.status(401).send({
          message: "密码错误2",
          error,
        })
      })
    })
    .catch(error => {
      response.status(404).send({
        message: "Email not found",
        error,
      })
    })
});

// Add this AFTER all your routes
app.use(errorHandler())

// your own error handler
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     // Your error handler logic
// });