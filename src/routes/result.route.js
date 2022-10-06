const resultRouter = require("express").Router();
const { resultController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy kết quả của người chơi có id (admin/user)
 */
resultRouter.get("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, resultController.getResultById);

/**
 * Cập nhật kết quả của người chơi có id (admin/user)
 */
resultRouter.put("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, resultController.updateResultById);

module.exports = resultRouter;
