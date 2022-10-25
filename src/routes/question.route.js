const questionRouter = require("express").Router();
const { questionController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");
const { upload } = require("../configs/index");

/**
 * Lấy tất cả câu hỏi (admin/user)
 */
questionRouter.get("/", authMiddleware.verifyTokens(["access_token"]), questionController.getQuestions);

/**
 * Tạo 1 câu hỏi (admin)
 */
questionRouter.post("/", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), upload.fields([{ name: "question_imgs" }, { name: "option_imgs" }]), questionController.createQuestion);

/**
 * Lấy 1 câu hỏi (admin/user)
 */
questionRouter.get("/:id", authMiddleware.verifyTokens(["access_token"]), questionController.getQuestion);

/**
 * Sửa 1 câu hỏi (admin/user)
 */
questionRouter.put("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), upload.fields([{ name: "question_imgs" }, { name: "option_imgs" }]), questionController.updateQuestion);

/**
 * Xóa 1 câu hỏi (admin/user)
 */
questionRouter.delete("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), questionController.deleteQuestion);

module.exports = questionRouter;
