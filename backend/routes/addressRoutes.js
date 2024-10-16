const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// 获取用户地址
router.get("/profile/address", async (req, res) => {
  const { id } = req.query;

  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 新增地址
router.post("/profile/address", async (req, res) => {
  const { id, address } = req.body;

  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 检查地址数量是否已达到上限
    if (user.addresses.length >= 3) {
      return res
        .status(400)
        .json({ message: "Cannot add more than 3 addresses" });
    }

    user.addresses.push(address);
    await user.save();
    res.status(200).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 删除地址
router.delete("/profile/address", async (req, res) => {
  const { id, placeId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { id },
      { $pull: { addresses: { placeId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Address removed successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error removing address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
