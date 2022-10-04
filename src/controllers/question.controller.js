const httpStatus = require("http-status");
const { Question, Option } = require("../models/index");
const { Op } = require("sequelize");

const questionController = {
  createQuestion: async (req, res, next) => {
    const { question, score, options } = req.body;

    const ques = await Question.create({
      content: question,
      score: parseInt(score),
    });

    options.forEach(async (currentValue, index, arr) => {
      await Option.create({
        content: currentValue.content,
        is_true: currentValue.is_true,
        question_id: parseInt(ques.id),
      });
    });

    return res.status(200).json({ message: "Successfully.", data: { id: ques.id } });
  },

  getAllQuestion: async (req, res, next) => {
    const allQuestion = await Question.findAll({
      include: [Option],
    });

    return res.status(200).json({ message: "Successfully.", data: allQuestion });
  },

  getQuestionById: async (req, res, next) => {
    const question = await Question.findOne({
      attributes: ["content", "score", "updated_at", "created_at"],
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

    return res.status(200).json({ message: "Successfully.", data: { id: req.params.id, question: question.content, score: question.score, options: options, updated_at: question.updated_at, created_at: question.created_at } });
  },

  updateQuestionById: async (req, res, next) => {
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

    return res.status(200).json({ message: "Successfully.", data: null });
  },

  deleteQuestionById: async (req, res, next) => {
    await Question.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.status(200).json({ message: "Successfully.", data: null });
  },
};

module.exports = questionController;
