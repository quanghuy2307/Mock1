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

    const questionId = parseInt(ques.id);

    options.forEach(async (currentValue, index, arr) => {
      await Option.create({
        content: currentValue.content,
        is_true: currentValue.isTrue,
        question_id: questionId,
      });
    });

    return res.status(200).json({ message: "Successfully.", data: { id: questionId } });
  },

  getAllQuestion: async (req, res, next) => {
    return res.status(200).json({ message: "Successfully.", data: {} });
  },

  getQuestionById: async (req, res, next) => {
    const questionId = parseInt(req.params.id);

    const question = await Question.findOne({
      attributes: ["content", "score"],
      where: {
        id: questionId,
      },
    });

    const options = await Option.findAll({
      attributes: ["content", "is_true"],
      where: {
        question_id: questionId,
      },
    });

    return res.status(200).json({ message: "Successfully.", data: { id: questionId, question: question.content, score: parseInt(question.score), options: options } });
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
    const questionId = parseInt(req.params.id);

    await Question.destroy({
      where: {
        id: questionId,
      },
    });

    return res.status(200).json({ message: "Successfully.", data: null });
  },
};

module.exports = questionController;
