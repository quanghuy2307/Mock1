const questionRouter = require("express").Router();
const { questionController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

questionRouter.post("/", authMiddleware.verifyAccessTokenAndAdmin, questionController.createQuestion);
questionRouter.get("/", authMiddleware.verifyAccessToken, questionController.getAllQuestion);
questionRouter.get("/:id", authMiddleware.verifyAccessToken, questionController.getQuestionById);
questionRouter.put("/:id", authMiddleware.verifyAccessTokenAndAdmin, questionController.updateQuestionById);
questionRouter.delete("/:id", authMiddleware.verifyAccessTokenAndAdmin, questionController.deleteQuestionById);

module.exports = questionRouter;
