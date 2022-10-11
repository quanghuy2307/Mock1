const { Answer, Result, Question } = require("../models/index");
const _ = require("lodash");

const answerController = {
  createAnswer: async (req, res) => {
    try {
      const previousAnswer = await Answer.findOne({
        attributes: ["turn"],
        order: [["turn", "DESC"]],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      const newTurn = previousAnswer ? parseInt(previousAnswer.turn) + 1 : 1;

      req.body.answers.forEach((answer) => {
        answer.user_id = parseInt(req.params.id);
        answer.turn = newTurn;
      });

      await Answer.bulkCreate(req.body.answers);

      const newAnswer = await Answer.findAll({
        attributes: ["question_id", "choices"],
        include: [
          {
            model: Question,
            attributes: ["answers"],
          },
        ],
        where: {
          user_id: parseInt(req.params.id),
          turn: newTurn,
        },
      });

      const corrects = [];
      const incorrects = [];

      newAnswer.forEach((answer) => {
        if (_.isEqual(answer.choices.sort(), answer.Question.answers.sort())) {
          corrects.push(parseInt(answer.question_id));
        } else {
          incorrects.push(parseInt(answer.question_id));
        }
      });

      await Result.create({
        user_id: parseInt(req.params.id),
        turn: newTurn,
        total_correct: corrects.length,
        total_incorrect: incorrects.length,
        total: corrects.length + incorrects.length,
        corrects: corrects,
        incorrects: incorrects,
      });

      return res.status(200).json({ message: "Create answer successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAnswer: async (req, res) => {
    try {
      const answers = await Answer.findAll({
        attributes: ["question_id", "choices", "turn", "created_at"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!answers.length) {
        return res.status(404).json({ message: "Answer not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get answer successfully.", data: answers });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteAnswer: async (req, res) => {
    try {
      const isAnswerValid = await Answer.findOne({
        attributes: ["id"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!isAnswerValid) {
        return res.status(404).json({ message: "Answer not found.", data: null });
      } else {
        await Answer.destroy({
          where: {
            user_id: parseInt(req.params.id),
          },
        });

        await Result.destroy({
          where: {
            user_id: parseInt(req.params.id),
          },
        });

        return res.status(200).json({ message: "Delete answer successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = answerController;
