const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/getUser", userController.getUser);
userRouter.put("/updateUser", userController.updateUser);
userRouter.delete("/deleteUser", userController.deleteUser);

module.exports = userRouter;
