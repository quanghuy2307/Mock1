const resultRouter = require("express").Router();
const { resultController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy toàn bộ kết quả của người chơi (admin)
 */
resultRouter.get("/", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, resultController.getResults);

/**
 * Lấy kết quả của người chơi có id (admin/user)
 */
resultRouter.get("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, resultController.getResult);

module.exports = resultRouter;
