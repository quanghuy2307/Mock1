const resultRouter = require("express").Router();
const { resultController } = require("../controllers/index");

/* Lấy bảng kết quả của tất cả người chơi (admin) */
resultRouter.get("/", resultController.getAllResult);
/* Lấy bảng kết quả của người id (admin/user) */
resultRouter.get("/:id", resultController.getResultById);
/* Cập nhật bảng kết quả của tất cả người chơi (admin) */
resultRouter.put("/", resultController.updateAllResult);
/* Cập nhật bảng kết quả của người id (admin/user) */
resultRouter.put("/:id", resultController.updateResultById);

/* Lấy câu trả lời của tất cả câu hỏi (admin) */
resultRouter.get("/question", resultController.getAllAnswer);
/* Lấy câu trả lời của câu hỏi id (admin/user) */
resultRouter.get("/question/:id", resultController.getAnswerById);

/* Trả lời câu hỏi id (admin/user) */
resultRouter.post("/question/:id", resultController.createAnswerById);
/* Cập nhật câu trả lời câu hỏi id (admin/user) */
resultRouter.put("/question/:id", resultController.updateAnswerById);

module.exports = resultRouter;
