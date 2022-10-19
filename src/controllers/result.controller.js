const { Result } = require("../models/index");
const responseUtility = require("../utilities/response.utility");

const resultController = {
  getResults: async (req, res) => {
    try {
      const results = await Result.findAll({
        attributes: ["total", "total_correct", "total_incorrect", "corrects", "incorrects", "turn", "created_at"],
      });

      if (!results.length) {
        responseUtility.response(res, 404, "Result not found.", null);
      } else {
        responseUtility.response(res, 200, "Get result successfully.", results);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getResult: async (req, res) => {
    try {
      const results = await Result.findAll({
        attributes: ["total", "total_correct", "total_incorrect", "corrects", "incorrects", "turn", "created_at"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!results.length) {
        responseUtility.response(res, 404, "Result not found.", null);
      } else {
        responseUtility.response(res, 200, "Get result successfully.", results);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = resultController;
