const questionRouter = require("express").Router();
const { questionController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy tất cả câu hỏi (admin/user)
 */
questionRouter.get("/", authMiddleware.verifyAccessToken, questionController.getQuestions);

/**
 * Tạo 1 câu hỏi (admin)
 */
questionRouter.post("/", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, questionController.createQuestion);

/**
 * Lấy 1 câu hỏi (admin/user)
 */
questionRouter.get("/:id", authMiddleware.verifyAccessToken, questionController.getQuestion);

/**
 * Sửa 1 câu hỏi (admin/user)
 */
questionRouter.put("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, questionController.updateQuestion);

/**
 * Xóa 1 câu hỏi (admin/user)
 */
questionRouter.delete("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, questionController.deleteQuestion);

module.exports = questionRouter;
