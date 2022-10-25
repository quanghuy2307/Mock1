const resultRouter = require("express").Router();
const { resultController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy toàn bộ kết quả của người chơi (admin)
 */
resultRouter.get("/", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), resultController.getResults);

/**
 * Lấy kết quả của 1 người chơi (admin/user)
 */
resultRouter.get("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin", "user"]), resultController.getResult);

module.exports = resultRouter;
