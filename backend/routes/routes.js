const express = require("express");
const router = express.Router();

const portfolioRoutes = require("./portfolioRoutes");
const profileRoutes = require("./profileRoutes");
const findMatchesRoutes = require("./findMatchesRoutes");

// 使用子路由

router.use("/api", portfolioRoutes);
router.use("/api", profileRoutes);
router.use("/api", findMatchesRoutes);

module.exports = router;
