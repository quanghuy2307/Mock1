const userRouter = require("express").Router();
const { userController } = require("../controllers/index");
const { authMiddleware, validationMiddleware } = require("../middlewares/index");
const { userValidation } = require("../validations/index");
const { upload } = require("../configs/index");

/**
 * Lấy tất cả user (admin)
 */
userRouter.get("/", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), validationMiddleware.validate(userValidation.getUsers), userController.getUsers);

/**
 * Lấy thông tin 1 user (admin/user)
 */
userRouter.get("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin", "user"]), validationMiddleware.validate(userValidation.getUser), userController.getUser);

/**
 * Cập nhật 1 user (admin/user)
 */
userRouter.put("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin", "user"]), upload.single("avatar"), validationMiddleware.validate(userValidation.updateUser), userController.updateUser);

/**
 * Xóa 1 user (admin)
 */
userRouter.delete("/:id", authMiddleware.verifyTokens(["access_token"]), authMiddleware.verifyPiorities(["admin"]), validationMiddleware.validate(userValidation.deleteUser), userController.deleteUser);

module.exports = userRouter;
