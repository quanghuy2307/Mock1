const questionRouter = require("express").Router();
const { questionController } = require("../controllers/index");

questionRouter.post("/", questionController.createQuestion);
questionRouter.get("/", questionController.getAllQuestion);
questionRouter.get("/:id", questionController.getQuestionById);
questionRouter.put("/:id", questionController.updateQuestionById);
questionRouter.delete("/:id", questionController.deleteQuestionById);

module.exports = questionRouter;
