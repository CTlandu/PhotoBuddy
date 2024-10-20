const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// 获取热门城市
router.get("/popularCities", async (req, res) => {
  try {
    const popularCities = await User.aggregate([
      { $unwind: "$addresses" },
      {
        $group: {
          _id: "$addresses.formattedCity",
          count: { $sum: 1 },
        },
      },
      { $match: { _id: { $ne: null, $ne: "" } } }, // 添加这行来过滤掉 null 和空字符串
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          city: "$_id",
          count: 1,
        },
      },
    ]);

    res
      .status(200)
      .json(popularCities.map((item) => item.city).filter(Boolean));
  } catch (error) {
    console.error("Error fetching popular cities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 修改 fetchAll 路由以支持分页
router.get("/fetchAll", async (req, res) => {
  const { role, city, page = 1, limit = 6 } = req.query;
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

    if (city && city.trim() !== "") {
      query["addresses.formattedCity"] = city.trim();
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(query, projection)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalCount,
      hasMore: skip + users.length < totalCount,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
