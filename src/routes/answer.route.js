const answerRouter = require("express").Router();
const { answerController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Gửi câu trả lời lên (admin/user)
 */
answerRouter.post("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, answerController.createAnswer);

/**
 * Xem lại câu trả lời sau khi nộp (admin/user)
 */
answerRouter.get("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, answerController.getAnswer);

/**
 * Xóa câu trả lời sau khi nộp (admin)
 */
answerRouter.delete("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, answerController.deleteAnswer);

module.exports = answerRouter;
