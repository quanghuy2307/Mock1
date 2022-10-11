const { Question } = require("../models/index");
const { Op } = require("sequelize");
const { paginationUtility } = require("../utilities/index");

const questionController = {
  getQuestions: async (req, res) => {
    try {
      const { page, size, question } = req.query;
      const { limit, offset } = paginationUtility.getPagination(parseInt(page), parseInt(size));

      const data = await Question.findAndCountAll({
        attributes: ["id", "question", "options", "updated_at", "created_at"],
        where: (condition = question ? { question: { [Op.like]: `%${question}%` } } : null),
        offset: offset,
        limit: limit,
      });

      const response = paginationUtility.getPagingData(data, page, limit);

      if (response.current_items.length) {
        return res.status(200).json({ message: "Get question successfully.", data: response });
      } else {
        return res.status(404).json({ message: "Question not found.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  createQuestion: async (req, res) => {
    try {
      const isQuestionValid = await Question.findOne({
        attributes: ["id"],
        where: {
          question: req.body.question,
        },
      });

      if (isQuestionValid) {
        return res.status(404).json({ message: "Question is valid.", data: null });
      } else {
        const newQuestion = await Question.create({
          question: req.body.question,
          options: req.body.options,
          answers: req.body.answers,
        });

        return res.status(200).json({ message: "Create question successfully.", data: { id: newQuestion.id } });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getQuestion: async (req, res) => {
    try {
      const question = await Question.findOne({
        attributes: ["id", "question", "options", "updated_at", "created_at"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!question) {
        return res.status(404).json({ message: "Question not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get question successfully.", data: question });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const question = await Question.findOne({
        attributes: ["id"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!question) {
        return res.status(404).json({ message: "Question not found.", data: null });
      } else {
        await Question.update(
          {
            question: req.body.question,
            options: req.body.options,
            answers: req.body.answers,
            updated_at: Date.now(),
          },
          {
            where: {
              id: parseInt(req.params.id),
            },
          }
        );

        return res.status(200).json({ message: "Update question successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const question = await Question.findOne({
        attributes: ["id"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!question) {
        return res.status(404).json({ message: "Question not found.", data: null });
      } else {
        await Question.destroy({
          where: {
            id: parseInt(req.params.id),
          },
        });

        return res.status(200).json({ message: "Delete question successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = questionController;
