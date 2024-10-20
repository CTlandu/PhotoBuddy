const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// 获取用户资料
router.get("/profile", async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 更新用户资料
router.put("/profile", async (req, res) => {
  const {
    id,
    preferredName,
    lastName,
    pronouns,
    birthday,
    zipcode,
    avatar,
    contact,
    addresses,
    showEmailOnCard,
    showAgeOnCard,
  } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.preferredName =
      preferredName !== undefined ? preferredName : user.preferredName;
    user.lastName = lastName !== undefined ? lastName : user.lastName;
    user.pronouns = pronouns !== undefined ? pronouns : user.pronouns;
    user.birthday = birthday !== undefined ? birthday : user.birthday;
    user.showEmailOnCard =
      showEmailOnCard !== undefined ? showEmailOnCard : user.showEmailOnCard;
    user.showAgeOnCard =
      showAgeOnCard !== undefined ? showAgeOnCard : user.showAgeOnCard;
    user.zipcode = zipcode !== undefined ? zipcode : user.zipcode;
    user.avatar = avatar !== undefined ? avatar : user.avatar;
    user.addresses = addresses || user.addresses;
    user.contact = { ...user.contact, ...contact };
    await user.save();
    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

module.exports = router;
