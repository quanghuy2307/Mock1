const { Result } = require("../models/index");
const { responseUtility } = require("../utilities/index");

const resultController = {
  getResults: async (req, res) => {
    try {
      const results = await Result.findAll({
        attributes: ["total", "total_correct", "total_incorrect", "corrects", "incorrects", "turn", "created_at"],
      });

      if (!results.length) {
        return responseUtility.response(res, 404, "Result not found.", null);
      } else {
        return responseUtility.response(res, 200, "Get result successfully.", results);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getResult: async (req, res) => {
    try {
      const results = await Result.findAll({
        attributes: ["total", "total_correct", "total_incorrect", "corrects", "incorrects", "turn", "created_at"],
        where: {
          user_id: req.params.id,
        },
      });

      if (!results.length) {
        return responseUtility.response(res, 404, "Result not found.", null);
      } else {
        return responseUtility.response(res, 200, "Get result successfully.", results);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = resultController;
