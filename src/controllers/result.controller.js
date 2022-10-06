const httpStatus = require("http-status");
const { Option, Answer, Result } = require("../models/index");

const resultController = {
  getResultById: async (req, res, next) => {
    try {
      const result = await Result.findOne({
        attributes: ["correct", "incorrect", "total"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({ message: "Get result successfully.", data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateResultById: async (req, res, next) => {
    try {
      const val = await Option.findAll({
        attributes: ["question_id", "is_true"],
        order: [["question_id", "ASC"]],
        include: [
          {
            model: Answer,
            attributes: ["is_choice"],
            where: {
              user_id: parseInt(req.params.id),
            },
          },
        ],
      });

      let questionID = 0;
      let total = 0;
      let incorrect = 0;
      let isChecked = false;

      val.forEach((currentValue, index, arr) => {
        if (questionID != currentValue.question_id) {
          questionID = currentValue.question_id;
          isChecked = false;
          total++;
        }

        if (!isChecked) {
          if (currentValue.is_true != currentValue.Answers[0].is_choice) {
            incorrect++;
            isChecked = true;
          }
        }
      });

      await Result.update(
        {
          correct: total - incorrect,
          incorrect: incorrect,
          total: total,
        },
        {
          where: {
            user_id: parseInt(req.params.id),
          },
        }
      );

      return res.status(200).json({ message: "Update result successfully.", data: null });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = resultController;
