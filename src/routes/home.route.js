const homeRouter = require("express").Router();
const { authMiddleware } = require("../middlewares/index");

homeRouter.get("/", authMiddleware.verifyAccessToken, (req, res) => {
  return res.status(200).json({ message: "Chào mừng đến với bình nguyên vô tận.", data: null });
});

module.exports = homeRouter;
