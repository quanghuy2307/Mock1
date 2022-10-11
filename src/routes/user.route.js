const userRouter = require("express").Router();
const { userController } = require("../controllers/index");
const { authMiddleware } = require("../middlewares/index");

/**
 * Lấy tất cả user (admin)
 */
userRouter.get("/", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, userController.getUsers);

/**
 * Lấy thông tin user (admin/user)
 */
userRouter.get("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, userController.getUser);

/**
 * Cập nhật user (admin/user)
 */
userRouter.put("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, userController.updateUser);

/**
 * Xóa user (admin)
 */
userRouter.delete("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, userController.deleteUser);

module.exports = userRouter;
