const homeRouter = require("express").Router();
const { authMiddleware } = require("../middlewares/index");
const responseUtility = require("../utilities/response.utility");

homeRouter.get("/", authMiddleware.verifyTokens(["access_token"]), (req, res) => {
  return responseUtility.response(res, 200, "Chào mừng đến với bình nguyên vô tận.", null);
});

module.exports = homeRouter;
