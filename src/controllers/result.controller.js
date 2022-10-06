const httpStatus = require("http-status");
const { Question, Option, Answer, Result } = require("../models/index");
const { Op } = require("sequelize");

const resultController = {
  getAllResult: async (req, res, next) => {
    try {
    } catch (err) {}
  },

  getResultById: async (req, res, next) => {
    try {
      const val = await Option.findAll({
        attributes: ["question_id", "is_true"],
        include: [
          // {
          //   model: Question,
          // },
          {
            model: Answer,
            attributes: ["is_choice"],
            where: {
              user_id: parseInt(req.params.id),
            },
          },
        ],
      });

      return res.status(200).json(val);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateAllResult: async (req, res, next) => {
    try {
    } catch (err) {}
  },

  updateResultById: async (req, res, next) => {
    try {
      const val = await Answer.findAll({
        include: [
          // {
          //   model: Question,
          // },
          {
            model: Option,
          },
        ],
        where: {
          user_id: parseInt(req.params.id),
        },
      });

      return res.status(200).json(val);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = resultController;
