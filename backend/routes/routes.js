const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
// const addressRoutes = require("./addressRoutes");
const portfolioRoutes = require("./portfolioRoutes");
const profileRoutes = require("./profileRoutes");

// 使用子路由
router.use("/api", userRoutes);
// router.use("/api", addressRoutes);
router.use("/api", portfolioRoutes);
router.use("/api", profileRoutes);

module.exports = router;
