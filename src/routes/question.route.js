const questionRouter = require("express").Router();
const { questionController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Tạo câu hỏi (admin)
 */
questionRouter.post("/", authMiddleware.verifyAccessTokenAndAdmin, questionController.createQuestion);

/**
 * Lấy tất cả câu hỏi (admin/user)
 */
questionRouter.get("/", authMiddleware.verifyAccessToken, questionController.getAllQuestion);

/**
 * Lấy 1 câu hỏi (admin/user)
 */
questionRouter.get("/:id", authMiddleware.verifyAccessToken, questionController.getQuestionById);

/**
 * Sửa 1 câu hỏi (admin/user)
 */
questionRouter.put("/:id", authMiddleware.verifyAccessTokenAndAdmin, questionController.updateQuestionById);

/**
 * Xóa 1 câu hỏi (admin/user)
 */
questionRouter.delete("/:id", authMiddleware.verifyAccessTokenAndAdmin, questionController.deleteQuestionById);

module.exports = questionRouter;
