const userRouter = require("express").Router();
const { userController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy tất cả user (admin)
 */
userRouter.get("/", authMiddleware.verifyAccessTokenAndAdmin, userController.getAllUser);

/**
 * Lấy thông tin user (admin/user)
 */
userRouter.get("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, userController.getUserById);

/**
 * Cập nhật user (admin/user)
 */
userRouter.put("/:id", authMiddleware.verifyAccessTokenAndAdminOrBySelf, userController.updateUserById);

/**
 * Xóa user (admin)
 */
userRouter.delete("/:id", authMiddleware.verifyAccessTokenAndAdmin, userController.deleteUserById);

module.exports = userRouter;
