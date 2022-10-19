const { Answer, Result, Question } = require("../models/index");
const _ = require("lodash");
const responseUtility = require("../utilities/response.utility");

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

      req.body.answers.forEach(async (answer) => {
        await Answer.create({
          user_id: parseInt(req.user.id),
          turn: newTurn,
          question_id: parseInt(answer.question_id),
          choices: answer.choices,
        });
      });

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

      responseUtility.response(res, 200, "Create answer successfully.", null);
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
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
        responseUtility.response(res, 200, "Answer not found.", null);
      } else {
        responseUtility.response(res, 200, "Get answer successfully.", answers);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
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
        responseUtility.response(res, 404, "Answer not found.", null);
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

        responseUtility.response(res, 200, "Delete answer successfully.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = answerController;
