// routes/routes.js

const express = require('express');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/userModel'); // 引用你的User模型
const router = express.Router();



// fetchAll API
router.get("/fetchAll", async (req, res) => {
  const { role } = req.query; // 从查询参数中获取 role

  try {
    let users;

    // 根据类型获取不同的信息
    if (role === "model") {
      users = await User.find(
        { "model_info.model_images": { $ne: [] } }, // 查找 model_images 非空的用户
        {
          model_info: 1, // 只返回 model_info 字段
          preferredName: 1, // 返回 preferredName 字段
          email: 1, // 返回 email 字段
          avatar: 1, // 返回 avatar 字段
          pronouns: 1, // 返回 pronouns 字段
          birthday: 1, // 返回 birthday 字段
          zipcode: 1, // 返回 zipcode 字段
          contact: 1, // 返回 contact 字段
        }
      );
    } else if (role === "photographer") {
      users = await User.find(
        { "photographer_info.photographer_images": { $ne: [] } }, // 查找 photographer_images 非空的用户
        {
          photographer_info: 1, // 只返回 photographer_info 字段
          preferredName: 1, // 返回 preferredName 字段
          email: 1, // 返回 email 字段
          avatar: 1, // 返回 avatar 字段
          pronouns: 1, // 返回 pronouns 字段
          birthday: 1, // 返回 birthday 字段
          zipcode: 1, // 返回 zipcode 字段
          contact: 1, // 返回 contact 字段
        }
      );
    } else {
      return res.status(400).json({ message: "Invalid role parameter. Must be 'model' or 'photographer'." });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// 更新ModelInfo或PhotographerInfo
router.put("/updateProfile", async (req, res) => {
  const { id, model_info, photographer_info } = req.body;

  try {
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 如果请求中包含model_info，则更新model_info
    if (model_info) {
      if (model_info.model_lookingfor) {
        // 确保 model_lookingfor 中只包含唯一值
        model_info.model_lookingfor = [...new Set(model_info.model_lookingfor)];
      }
      user.model_info = {
        ...user.model_info, // 保留之前的值
        ...model_info, // 更新新的值
      };
    }

    // 如果请求中包含photographer_info，则更新photographer_info
    if (photographer_info) {
      if (photographer_info.photographer_lookingfor) {
        // 确保 photographer_lookingfor 中只包含唯一值
        photographer_info.photographer_lookingfor = [...new Set(photographer_info.photographer_lookingfor)];
      }
      user.photographer_info = {
        ...user.photographer_info, // 保留之前的值
        ...photographer_info, // 更新新的值
      };
    }

    // 保存更新后的用户信息
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
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

        phoneNumber_preferred: contact.phoneNumber_preferred !== undefined ? contact.phoneNumber_preferred : user.contact?.phoneNumber_preferred,
        instagram_preferred: contact.instagram_preferred !== undefined ? contact.instagram_preferred : user.contact?.instagram_preferred,
        linkedin_preferred: contact.linkedin_preferred !== undefined ? contact.linkedin_preferred : user.contact?.linkedin_preferred,
        twitter_preferred: contact.twitter_preferred !== undefined ? contact.twitter_preferred : user.contact?.twitter_preferred,
        facebook_preferred: contact.facebook_preferred !== undefined ? contact.facebook_preferred : user.contact?.facebook_preferred,
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



module.exports = router;
