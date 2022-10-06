const httpStatus = require("http-status");
const { Answer } = require("../models/index");

const answerController = {
  createAnswer: async (req, res, next) => {
    try {
      const userID = parseInt(req.user.id);
      const data = req.body.answers;
      const answers = [];

      data.forEach((currentValue, index, arr) => {
        const questionID = parseInt(currentValue.question_id);

        currentValue.options.forEach((currentValue, index, arr) => {
          currentValue.user_id = userID;
          currentValue.question_id = questionID;
        });

        answers.push(...currentValue.options);
      });

      await Answer.bulkCreate(answers);

      return res.status(200).json({ message: "Create answer successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAnswer: async (req, res, next) => {
    try {
      const val = await Answer.findAll({
        attributes: ["question_id", "option_id", "is_choice"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      const answers = [];
      let answer = {};
      let idx = 0;

      val.forEach((currentValue, index, arr) => {
        if (answer.question_id != currentValue.question_id) {
          answer = {
            question_id: currentValue.question_id,
            options: [],
          };

          answers.push(answer);

          idx++;
        }

        answers[idx - 1].options.push({
          option_id: currentValue.option_id,
          is_choice: currentValue.is_choice,
        });
      });

      // const val = await Answer.findAll({
      //   include: [
      //     {
      //       model: Question,
      //     },
      //     {
      //       model: Option,
      //     },
      //   ],
      //   where: {
      //     user_id: parseInt(req.params.id),
      //   },
      // });

      return res.status(200).json({ message: "Get answer successfully.", data: answers });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateAnswer: async (req, res, next) => {
    try {
      const userID = parseInt(req.params.id);
      const data = req.body.answers;

      data.forEach((currentValue, index, arr) => {
        const questionID = parseInt(currentValue.question_id);

        currentValue.options.forEach(async (currentValue, index, arr) => {
          const optionId = parseInt(currentValue.option_id);

          await Answer.update(
            {
              is_choice: currentValue.is_choice,
            },
            {
              where: {
                user_id: userID,
                question_id: questionID,
                option_id: optionId,
              },
            }
          );
        });
      });

      return res.status(200).json({ message: "Update answer successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteAnswer: async (req, res, next) => {
    try {
      await Answer.destroy({
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({ message: "Delete answer successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = answerController;
