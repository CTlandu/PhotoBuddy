const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const addressRoutes = require("./addressRoutes");
const imageRoutes = require("./imageRoutes");
const profileRoutes = require("./profileRoutes");

// 使用子路由
router.use("/api", userRoutes);
router.use("/api", addressRoutes);
router.use("/api", imageRoutes);
router.use("/api", profileRoutes);

module.exports = router;
