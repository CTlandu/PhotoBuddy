const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const portfolioRoutes = require("./portfolioRoutes");
const profileRoutes = require("./profileRoutes");

// 使用子路由
router.use("/api", userRoutes);
router.use("/api", portfolioRoutes);
router.use("/api", profileRoutes);

module.exports = router;
