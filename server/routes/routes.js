// routes/routes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/userModel'); // 引用你的User模型
const router = express.Router();

// 用户注册时的后端API
router.post('/saveUserInfo', async (req, res) => {
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
router.get('/profile', async (req, res) => {
  try {
    const userId = req.query.id; // 假设通过查询参数传递用户ID
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 处理 PUT 请求，更新用户数据
router.put('/profile', async (req, res) => {
  try {
    const { id, preferredName, lastName, pronouns, email, birthday, zipcode, twitter, facebook, instagram, linkedin, avatar } = req.body;

    // 检查必填字段是否缺失
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // 更新用户信息
    const updatedUser = await User.findOneAndUpdate(
      { id },
      { preferredName, lastName, pronouns, email, birthday, zipcode, twitter, facebook, instagram, linkedin, avatar },
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
router.post('/register', (request, response) => {
  // hash the password before saving the email and password into the database
  try {
    let userId = request.session.getUserId();
    console.log('userId', userId);
  } catch {
    console.log("wtf2");
  }

  bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      user.save()
        .then((result) => {
          response.status(201).send({
            message: "User created Successfully用户注册成功",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user用户创建失败",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).json({
        message: "密码哈希失败",
        e: e.message,
      });
      console.log(e);
    });
});

// create a "login" endpoint
router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt.compare(request.body.password, user.password)
        .then((passwordChecked) => {
          if (!passwordChecked) {
            return response.status(401).send({
              message: "密码错误1",
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: '1h' }
          );

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
          });
        });
    })
    .catch(error => {
      response.status(404).send({
        message: "Email not found",
        error,
      });
    });
});

module.exports = router;
