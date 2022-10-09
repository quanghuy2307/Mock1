const { Answer } = require("../models/index");

const answerController = {
  createAnswer: async (req, res) => {
    try {
      const isAnswerValid = await Answer.findOne({
        // Trả về null nếu k tìm thấy
        attributes: ["question_id"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (isAnswerValid) {
        return res.status(404).json({ message: "Answer is valid.", data: null });
      } else {
        req.body.answers.forEach((answer) => {
          answer.user_id = parseInt(req.params.id);
        });

        await Answer.bulkCreate(req.body.answers);

        return res.status(200).json({ message: "Create answer successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAnswer: async (req, res) => {
    try {
      const answers = await Answer.findAll({
        // Trả về mảng rỗng nếu k tìm thấy
        attributes: ["question_id", "choices"],
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

  updateAnswer: async (req, res) => {
    try {
      const isAnswerValid = await Answer.findOne({
        attributes: ["question_id"],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      if (!isAnswerValid) {
        return res.status(404).json({ message: "Answer not found.", data: null });
      } else {
        req.body.answers.forEach(async (newAnswer) => {
          await Answer.update(
            {
              choices: newAnswer.choices,
            },
            {
              where: {
                user_id: parseInt(req.params.id),
                question_id: parseInt(newAnswer.question_id),
              },
            }
          );
        });

        return res.status(200).json({ message: "Update answer successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteAnswer: async (req, res) => {
    try {
      const isAnswerValid = await Answer.findOne({
        attributes: ["question_id"],
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

        return res.status(200).json({ message: "Delete answer successfully.", data: null });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = answerController;
