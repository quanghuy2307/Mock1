const httpStatus = require("http-status");
const { Question, Option } = require("../models/index");
const { Op } = require("sequelize");

const questionController = {
  createQuestion: async (req, res, next) => {
    try {
      const { question, score, options } = req.body;

      const newQuestion = await Question.create({
        content: question,
        score: parseInt(score),
      });

      options.forEach(async (currentValue, index, arr) => {
        await Option.create({
          content: currentValue.content,
          is_true: currentValue.is_true,
          question_id: parseInt(newQuestion.id),
        });
      });

      return res.status(200).json({ message: "Create new question successfully.", data: { id: newQuestion.id } });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAllQuestion: async (req, res, next) => {
    try {
      const allQuestion = await Question.findAll({
        include: [Option],
      });

      return res.status(200).json({ message: "Get all question successfully.", data: allQuestion });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getQuestionById: async (req, res, next) => {
    try {
      const question = await Question.findOne({
        attributes: ["content", "score"],
        where: {
          id: parseInt(req.params.id),
        },
      });

      const options = await Option.findAll({
        attributes: ["content", "is_true"],
        where: {
          question_id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({ message: "Get question successfully.", data: { id: req.params.id, question: question.content, score: question.score, options: options, updated_at: question.updated_at, created_at: question.created_at } });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateQuestionById: async (req, res, next) => {
    try {
      const { question, score, options } = req.body;
      const questionId = parseInt(req.params.id);

      await Question.update(
        {
          content: question,
          score: parseInt(score),
        },
        {
          where: {
            id: questionId,
          },
        }
      );

      const optionIds = await Option.findAll({
        attributes: ["id"],
        where: {
          question_id: questionId,
        },
      });

      options.forEach(async (currentValue, index, arr) => {
        await Option.update(
          {
            content: currentValue.content,
            is_true: currentValue.is_true,
          },
          {
            where: {
              [Op.and]: [{ id: parseInt(optionIds[index].id) }, { question_id: questionId }],
            },
          }
        );
      });

      return res.status(200).json({ message: "Update question successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteQuestionById: async (req, res, next) => {
    try {
      await Question.destroy({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({ message: "Delete question successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = questionController;
