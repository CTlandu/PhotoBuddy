// routes/routes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/userModel'); // 引用你的User模型
const router = express.Router();


// 更新PhotographerBio
router.put("/photographerBio", async (req, res) => {
  const { id, photographer_bio } = req.body;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.photographer_info.photographer_bio = photographer_bio;
    await user.save();

    res.status(200).json({ message: "Photographer bio updated successfully", user });
  } catch (error) {
    console.error("Error updating photographer bio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 更新modelBio
router.put("/modelBio", async (req, res) => {
  const { id, model_bio } = req.body;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.model_info.model_bio = model_bio;
    await user.save();

    res.status(200).json({ message: "Model bio updated successfully", user });
  } catch (error) {
    console.error("Error updating model bio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 摄影师照片上传
router.put('/photographerImageUpload', async (req, res) => {
  const { id, photographer_image } = req.body;

  try {
    // 打印出收到的数据，检查其结构
    console.log('Received ID:', id);
    console.log('Image Received');

    // 查找用户
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 确保 photographer_images 是一个数组
    if (!Array.isArray(user.photographer_info.photographer_images)) {
      user.photographer_info.photographer_images = [];
    }

   // 确保 photographer_image 是字符串
   if (typeof photographer_image === 'string') {
    // 将新的图片添加到现有的 photographer_images 数组中
    user.photographer_info.photographer_images.push(photographer_image);
    } else {
      throw new Error('Invalid image format');
    }

    // 保存更新后的用户信息
    await user.save();

    res.status(200).json({ message: 'Photographer images updated successfully', user });
  } catch (error) {
    console.error('Error updating photographer images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// 删除用户指定的摄影师图片
router.delete('/photographerImageDelete', async (req, res) => {
  const { id, photographer_image } = req.body;

  try {
    // 查找用户
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 从 photographer_images 数组中删除指定的图片
    user.photographer_info.photographer_images = user.photographer_info.photographer_images.filter(image => image !== photographer_image);

    // 保存更新后的用户信息
    await user.save();

    res.status(200).json({ message: 'Photographer image deleted successfully' });
  } catch (error) {
    console.error('Error deleting photographer image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// 模特照片上传
router.put('/modelImageUpload', async (req, res) => {
  const { id, model_image } = req.body;

  try {
    console.log('Received ID:', id);
    console.log('Image Received');

    // 查找用户
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 确保 model_images 是一个数组
    if (!Array.isArray(user.model_info.model_images)) {
      user.model_info.model_images = [];
    }

    // 确保 model_image 是字符串
    if (typeof model_image === 'string') {
      // 将新的图片添加到现有的 model_images 数组中
      user.model_info.model_images.push(model_image);
    } else {
      throw new Error('Invalid image format');
    }

    // 保存更新后的用户信息
    await user.save();

    res.status(200).json({ message: 'Model images updated successfully', user });
  } catch (error) {
    console.error('Error updating model images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// 接口：删除用户指定的模特图片
router.delete('/modelImageDelete', async (req, res) => {
  const { id, model_image } = req.body;

  try {
    // 查找用户
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 从 model_images 数组中删除指定的图片
    user.model_info.model_images = user.model_info.model_images.filter(image => image !== model_image);

    // 保存更新后的用户信息
    await user.save();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// 接口：用户注册时的后端API
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


// 接口： 用户进入profile page时的get API
router.get('/profile', async (req, res) => {
  try {
    const userId = req.query.id; // 假设通过查询参数传递用户ID
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    console.log('User profile fetched');
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// 接口：处理 PUT 请求，更新用户数据
router.put('/profile', async (req, res) => {
  const { id, preferredName, lastName, pronouns, birthday, zipcode, avatar, contact } = req.body;

  try {
    // 查找用户
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 更新用户信息
    user.preferredName = preferredName !== undefined ? preferredName : user.preferredName;
    user.lastName = lastName !== undefined ? lastName : user.lastName;
    user.pronouns = pronouns !== undefined ? pronouns : user.pronouns;
    user.birthday = birthday !== undefined ? birthday : user.birthday;
    user.zipcode = zipcode !== undefined ? zipcode : user.zipcode;
    user.avatar = avatar !== undefined ? avatar : user.avatar;

    // 更新联系信息，如果 contact 对象存在且有相应的属性
    if (contact) {
      user.contact = {
        ...user.contact, // 保留现有的联系信息
        phoneNumber: contact.phoneNumber !== undefined ? contact.phoneNumber : user.contact?.phoneNumber,
        instagram: contact.instagram !== undefined ? contact.instagram : user.contact?.instagram,
        linkedin: contact.linkedin !== undefined ? contact.linkedin : user.contact?.linkedin,
        twitter: contact.twitter !== undefined ? contact.twitter : user.contact?.twitter,
        facebook: contact.facebook !== undefined ? contact.facebook : user.contact?.facebook,
      };
    }

    // 保存更新后的用户信息
    await user.save();

    // 这里返回更新后的用户数据
    res.status(200).json({ message: 'User profile updated successfully', user});

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// create a "register" endpoint
// router.post('/register', (request, response) => {
//   // hash the password before saving the email and password into the database
//   try {
//     let userId = request.session.getUserId();
//     console.log('userId', userId);
//   } catch {
//     console.log("wtf2");
//   }

//   bcrypt.hash(request.body.password, 10)
//     .then((hashedPassword) => {
//       const user = new User({
//         email: request.body.email,
//         password: hashedPassword,
//       });

//       user.save()
//         .then((result) => {
//           response.status(201).send({
//             message: "User created Successfully用户注册成功",
//             result,
//           });
//         })
//         .catch((error) => {
//           response.status(500).send({
//             message: "Error creating user用户创建失败",
//             error,
//           });
//         });
//     })
//     .catch((e) => {
//       response.status(500).json({
//         message: "密码哈希失败",
//         e: e.message,
//       });
//       console.log(e);
//     });
// });

// // create a "login" endpoint
// router.post("/login", (request, response) => {
//   User.findOne({ email: request.body.email })
//     .then((user) => {
//       bcrypt.compare(request.body.password, user.password)
//         .then((passwordChecked) => {
//           if (!passwordChecked) {
//             return response.status(401).send({
//               message: "密码错误1",
//             });
//           }

//           const token = jwt.sign(
//             {
//               userId: user._id,
//               userEmail: user.email,
//             },
//             "RANDOM-TOKEN",
//             { expiresIn: '1h' }
//           );

//           response.status(201).send({
//             message: "登录成功",
//             email: user.email,
//             token,
//           });
//         })
//         .catch((error) => {
//           response.status(401).send({
//             message: "密码错误2",
//             error,
//           });
//         });
//     })
//     .catch(error => {
//       response.status(404).send({
//         message: "Email not found",
//         error,
//       });
//     });
// });

module.exports = router;
