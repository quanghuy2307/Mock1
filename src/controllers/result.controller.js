const httpStatus = require("http-status");
const { Question, Option, UserOption } = require("../models/index");
const { Op } = require("sequelize");

const resultController = {
  getAllResult: async (req, res, next) => {},

  getResultById: async (req, res, next) => {
    try {
    } catch (err) {}
  },

  updateAllResult: async (req, res, next) => {},

  updateResultById: async (req, res, next) => {
    try {
    } catch (err) {}
  },

  getAllAnswer: async (req, res, next) => {},

  getAnswerById: async (req, res, next) => {
    try {
    } catch (err) {}
  },

  createAnswerById: async (req, res, next) => {
    const options = req.body.options;

    try {
      options.forEach((currentValue, index, arr) => {
        currentValue.option_id = parseInt(currentValue.option_id);
        currentValue.user_id = parseInt(req.body.user_id);
        currentValue.question_id = parseInt(req.params.id);
      });

      opts = await UserOption.bulkCreate(options);

      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Error.", data: null });
    }
  },

  updateAnswerById: async (req, res, next) => {
    const options = req.body.options;

    try {
      options.forEach(async (currentValue, index, arr) => {
        await UserOption.update(
          {
            is_choice: currentValue.is_choice,
          },
          {
            where: {
              user_id: parseInt(req.body.user_id),
              question_id: parseInt(req.params.id),
              option_id: parseInt(currentValue.option_id),
            },
          }
        );
      });

      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Error.", data: null });
    }
  },
};

module.exports = resultController;
