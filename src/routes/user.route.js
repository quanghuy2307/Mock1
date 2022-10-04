const userRouter = require("express").Router();
const { userController } = require("../controllers/index");

userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
