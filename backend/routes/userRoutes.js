const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// 用户注册
router.post("/saveUserInfo", async (req, res) => {
  const userInfo = req.body;
  try {
    const newUser = new User(userInfo);
    await newUser.save();
    console.log("User information saved:", userInfo);
    res.status(200).send("User information saved successfully");
  } catch (error) {
    console.error("Error saving user information:", error);
    res.status(500).send("Internal server error");
  }
});

// 获取所有用户信息
router.get("/fetchAll", async (req, res) => {
  const { role, city } = req.query;
  try {
    let query = {};
    let projection = {
      preferredName: 1,
      email: 1,
      avatar: 1,
      pronouns: 1,
      birthday: 1,
      zipcode: 1,
      contact: 1,
      addresses: 1,
      showEmailOnCard: 1,
      showAgeOnCard: 1,
    };

    if (role === "model") {
      query["model_info.model_images"] = { $ne: [] };
      projection.model_info = 1;
    } else if (role === "photographer") {
      query["photographer_info.photographer_images"] = { $ne: [] };
      projection.photographer_info = 1;
    } else {
      return res.status(400).json({
        message: "Invalid role parameter. Must be 'model' or 'photographer'.",
      });
    }

    // 更新城市筛选逻辑
    if (city && city.trim() !== "") {
      query["addresses.formattedCity"] = city.trim();
    }

    console.log("Received query params:", { role, city });

    const users = await User.find(query, projection);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
