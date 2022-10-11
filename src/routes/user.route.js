const userRouter = require("express").Router();
const { userController } = require("../controllers/index");
const { authMiddleware, validationMiddleware } = require("../middlewares/index");
const { userValidation } = require("../validations/index");

/**
 * Lấy tất cả user (admin)
 */
userRouter.get("/", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, validationMiddleware.validate(userValidation.getUsers), userController.getUsers);

/**
 * Lấy thông tin user (admin/user)
 */
userRouter.get("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, validationMiddleware.validate(userValidation.getUser), userController.getUser);

/**
 * Cập nhật user (admin/user)
 */
userRouter.put("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdminOrBySelf, validationMiddleware.validate(userValidation.updateUser), userController.updateUser);

/**
 * Xóa user (admin)
 */
userRouter.delete("/:id", authMiddleware.verifyAccessToken, authMiddleware.verifyAdmin, validationMiddleware.validate(userValidation.deleteUser), userController.deleteUser);

module.exports = userRouter;
