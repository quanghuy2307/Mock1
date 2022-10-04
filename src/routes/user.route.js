const express = require("express");
const { userController } = require("../controllers/index");

const userRouter = express.Router();

userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
