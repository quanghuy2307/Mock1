const { Answer, Result, Question } = require("../models/index");
const _ = require("lodash");
const { responseUtility } = require("../utilities/index");

const answerController = {
  createAnswer: async (req, res) => {
    try {
      const previousAnswer = await Answer.findOne({
        attributes: ["turn"],
        order: [["turn", "DESC"]],
        where: {
          user_id: req.user.id,
        },
      });

      const newTurn = previousAnswer ? parseInt(previousAnswer.turn) + 1 : 1;

      req.body.answers.forEach(async (answer) => {
        await Answer.create({
          user_id: req.user.id,
          turn: newTurn,
          question_id: answer.question_id,
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
          user_id: req.user.id,
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
        user_id: req.user.id,
        turn: newTurn,
        total_correct: corrects.length,
        total_incorrect: incorrects.length,
        total: corrects.length + incorrects.length,
        corrects: corrects,
        incorrects: incorrects,
      });

      return responseUtility.response(res, 200, "Create answer successfully.", null);
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getAnswer: async (req, res) => {
    try {
      const answers = await Answer.findAll({
        attributes: ["question_id", "choices", "turn", "created_at"],
        where: {
          user_id: req.params.id,
        },
      });

      if (!answers.length) {
        return responseUtility.response(res, 200, "Answer not found.", null);
      } else {
        return responseUtility.response(res, 200, "Get answer successfully.", answers);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteAnswer: async (req, res) => {
    try {
      const userID = await Answer.findByPk(req.params.id);

      if (!userID) {
        return responseUtility.response(res, 404, "Answer not found.", null);
      } else {
        await Promise.all([
          Answer.destroy({
            where: {
              user_id: userID,
            },
          }),
          Result.destroy({
            where: {
              user_id: userID,
            },
          }),
        ]);

        // await Answer.destroy({
        //   where: {
        //     user_id: userID,
        //   },
        // });

        // await Result.destroy({
        //   where: {
        //     user_id: userID,
        //   },
        // });

        return responseUtility.response(res, 200, "Delete answer successfully.", null);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = answerController;
