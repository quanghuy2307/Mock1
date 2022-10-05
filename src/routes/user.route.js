const userRouter = require("express").Router();
const { userController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

userRouter.get("/", authMiddleware.verifyAccessTokenAndAdmin, userController.getAllUser);
userRouter.get("/:id", authMiddleware.verifyAccessToken, userController.getUserById);
userRouter.put("/:id", authMiddleware.verifyAccessToken, userController.updateUserById);
userRouter.delete("/:id", authMiddleware.verifyAccessTokenAndAdmin, userController.deleteUserById);

module.exports = userRouter;
