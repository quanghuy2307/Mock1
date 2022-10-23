const answerRouter = require("express").Router();
const { answerController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Gửi câu trả lời lên (admin/user)
 */
answerRouter.post("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin", "user"]), answerController.createAnswer);

/**
 * Xem lại câu trả lời sau khi nộp (admin/user)
 */
answerRouter.get("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin", "user"]), answerController.getAnswer);

/**
 * Xóa câu trả lời sau khi nộp (admin)
 */
answerRouter.delete("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), answerController.deleteAnswer);

module.exports = answerRouter;
