const { Question } = require("../models/index");

const questionController = {
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

  getAllQuestion: async (req, res) => {
    try {
      const questions = await Question.findAll({
        attributes: ["id", "question", "options"],
      });

      if (!questions) {
        return res.status(404).json({ message: "Question not found.", data: null });
      } else {
        return res.status(200).json({ message: "Get all question successfully.", data: questions });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getQuestionById: async (req, res) => {
    try {
      const question = await Question.findOne({
        attributes: ["id", "question", "options"],
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

  updateQuestionById: async (req, res) => {
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

  deleteQuestionById: async (req, res) => {
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
