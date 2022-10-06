const resultRouter = require("express").Router();
const { resultController } = require("../controllers/index");

/**
 * Lấy kết quả của tất cả người chơi (admin)
 */
resultRouter.get("/", resultController.getAllResult);

/**
 * Lấy kết quả của người chơi có id (admin/user)
 */
resultRouter.get("/:id", resultController.getResultById);

/**
 * Cập nhật kết quả của tất cả người chơi (admin)
 */
resultRouter.put("/", resultController.updateAllResult);

/**
 * Cập nhật kết quả của người chơi có id (admin/user)
 */
resultRouter.put("/:id", resultController.updateResultById);

module.exports = resultRouter;
