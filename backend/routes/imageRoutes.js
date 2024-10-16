const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// 摄影师图片上传
router.put("/photographerImageUpload", async (req, res) => {
  const { id, photographer_image } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!Array.isArray(user.photographer_info.photographer_images)) {
      user.photographer_info.photographer_images = [];
    }
    if (typeof photographer_image === "string") {
      user.photographer_info.photographer_images.push(photographer_image);
    } else {
      throw new Error("Invalid image format");
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Photographer images updated successfully", user });
  } catch (error) {
    console.error("Error updating photographer images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 删除摄影师图片
router.delete("/photographerImageDelete", async (req, res) => {
  const { id, photographer_image } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.photographer_info.photographer_images =
      user.photographer_info.photographer_images.filter(
        (image) => image !== photographer_image
      );
    await user.save();
    res
      .status(200)
      .json({ message: "Photographer image deleted successfully" });
  } catch (error) {
    console.error("Error deleting photographer image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 模特图片上传
router.put("/modelImageUpload", async (req, res) => {
  const { id, model_image } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!Array.isArray(user.model_info.model_images)) {
      user.model_info.model_images = [];
    }
    if (typeof model_image === "string") {
      user.model_info.model_images.push(model_image);
    } else {
      throw new Error("Invalid image format");
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Model images updated successfully", user });
  } catch (error) {
    console.error("Error updating model images:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 删除模特图片
router.delete("/modelImageDelete", async (req, res) => {
  const { id, model_image } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.model_info.model_images = user.model_info.model_images.filter(
      (image) => image !== model_image
    );
    await user.save();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
