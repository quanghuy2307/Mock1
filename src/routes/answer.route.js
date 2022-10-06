const answerRouter = require("express").Router();
const { answerController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Gửi tất cả câu trả lời lên (admin/user)
 */
answerRouter.post("/", authMiddleware.verifyAccessToken, answerController.createAnswer);

/**
 * Xem lại tất cả câu trả lời sau khi nộp (admin/user)
 */
answerRouter.get("/", answerController.getAnswer);

/**
 * Thay đổi câu trả lời sau khi nộp (admin/user)
 */
answerRouter.put("/", answerController.updateAnswer);

/**
 * Xóa tất cả câu trả lời sau khi nộp (admin)
 */
answerRouter.delete("/", answerController.deleteAnswer);

module.exports = answerRouter;
