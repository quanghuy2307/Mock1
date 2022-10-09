const answerRouter = require("express").Router();
const { answerController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Gửi câu trả lời lên (admin/user)
 */
answerRouter.post("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, answerController.createAnswer);

/**
 * Xem lại câu trả lời sau khi nộp (admin/user)
 */
answerRouter.get("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, answerController.getAnswer);

/**
 * Thay đổi câu trả lời sau khi nộp (admin/user)
 */
answerRouter.put("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, answerController.updateAnswer);

/**
 * Xóa câu trả lời sau khi nộp (admin)
 */
answerRouter.delete("/:id", authMiddleware.verifyAccessTokenAndAdmin, answerController.deleteAnswer);

module.exports = answerRouter;
