const httpStatus = require("http-status");
const { Answer } = require("../models/index");

const answerController = {
  createAnswer: async (req, res, next) => {
    const userID = parseInt(req.body.user.id);
    const data = req.body.answers;
    const answers = [];

    data.forEach((currentValue, index, arr) => {
      const questionID = parseInt(currentValue.question_id);

      currentValue.options.forEach((currentValue, index, arr) => {
        currentValue.user_id = userID;
        currentValue.question_id = questionID;
      });

      answers.push([...currentValue.options]);
    });

    try {
      await Answer.bulkCreate(answers);

      return res.status(200).json({ message: "Create answer successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = answerController;
