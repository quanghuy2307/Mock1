const { Result } = require("../models/index");

const resultController = {
  getResults: async (req, res) => {
    try {
      const results = await Result.findAll({
        attributes: ["total", "total_correct", "total_incorrect", "corrects", "incorrects", "turn", "created_at"],
      });

      if (!results.length) {
        return res.status(404).json({ message: "Result not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get result successfully.", data: results });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
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
        return res.status(404).json({ message: "Result not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get result successfully.", data: results });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = resultController;
