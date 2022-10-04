const express = require("express");
const { resultController } = require("../controllers/index");

const resultRouter = express.Router();

// resultRouter.post("/", resultController.createResult);
// resultRouter.get("/", resultController.getAllResult);
// resultRouter.get("/:id", resultController.getResultById);
// resultRouter.put("/:id", resultController.updateResultById);
// resultRouter.delete("/:id", resultController.deleteResultById);

module.exports = resultRouter;
