const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.getAllUser);
userRouter.get("/:userID", userController.getUserById);
userRouter.put("/:userID", userController.updateUser);
userRouter.delete("/:userID", userController.deleteUser);

module.exports = userRouter;
