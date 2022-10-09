const resultRouter = require("express").Router();
const { resultController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy toàn bộ kết quả của người chơi (admin)
 */
resultRouter.get("/", authMiddleware.verifyAccessTokenAndAdmin, resultController.getAllResult);

/**
 * Lấy kết quả của người chơi có id (admin/user)
 */
resultRouter.get("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, resultController.getResultById);

/**
 * Cập nhật kết quả của người chơi có id (admin/user)
 */
resultRouter.put("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, resultController.updateResultById);

/**
 * Xóa kết quả của người chơi có id (admin)
 */
resultRouter.delete("/:id", authMiddleware.verifyAccessTokenAndAdmin, resultController.deleteResultById);

module.exports = resultRouter;
