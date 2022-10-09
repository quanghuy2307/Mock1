const { Answer, Result, Question } = require("../models/index");
const _ = require("lodash");

const resultController = {
  getAllResult: async (req, res) => {
    try {
      const results = await Result.findAll({
        attributes: ["user_id", "corrects", "incorrects"],
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

  getResultById: async (req, res) => {
    try {
      const results = await Result.findOne({
        attributes: ["corrects", "incorrects"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!results) {
        return res.status(404).json({ message: "Result not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get result successfully.", data: results });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateResultById: async (req, res) => {
    try {
      const results = await Answer.findAll({
        attributes: ["question_id", "choices"],
        include: [
          {
            model: Question,
            attributes: ["answers"],
          },
        ],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!results.length) {
        return res.status(404).json({ message: "Result not found.", data: null });
      } else {
        const corrects = [];
        const incorrects = [];

        results.forEach((result) => {
          if (_.isEqual(result.choices.sort(), result.Question.answers.sort())) {
            corrects.push(parseInt(result.question_id));
          } else {
            incorrects.push(parseInt(result.question_id));
          }
        });

        await Result.update(
          {
            corrects: corrects,
            incorrects: incorrects,
          },
          {
            where: {
              user_id: parseInt(req.params.id),
            },
          }
        );

        return res.status(200).json({ message: "Update result successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteResultById: async (req, res) => {
    try {
      const results = await Result.findOne({
        attributes: ["user_id"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!results) {
        return res.status(404).json({ message: "Result not found.", data: null });
      } else {
        await Result.update(
          {
            corrects: [],
            incorrects: [],
          },
          {
            where: {
              user_id: parseInt(req.params.id),
            },
          }
        );

        return res.status(200).json({ message: "Delete result successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = resultController;
