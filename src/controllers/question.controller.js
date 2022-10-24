const { Question } = require("../models/index");
const { Op } = require("sequelize");
const { paginationUtility, responseUtility } = require("../utilities/index");
const { cloudinary } = require("../configs/index");

const questionController = {
  getQuestions: async (req, res) => {
    try {
      const { page, size, question } = req.query;
      const { limit, offset } = paginationUtility.getPagination(parseInt(page), parseInt(size));

      const data = await Question.findAndCountAll({
        attributes: ["id", "question", "question_image_links", "options", "option_image_links", "updated_at", "created_at"],
        where: (condition = question ? { question: { [Op.like]: `%${question}%` } } : null),
        offset: offset,
        limit: limit,
      });

      const response = paginationUtility.getPagingData(data, page, limit);

      if (response.current_items.length) {
        responseUtility.response(res, 200, "Get question successfully.", { response });
      } else {
        responseUtility.response(res, 404, "Question not found.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  createQuestion: async (req, res) => {
    try {
      const isQuestionValid = await Question.findOne({
        attributes: ["id"],
        where: {
          question: req.body.question,
        },
      });

      if (isQuestionValid) {
        responseUtility.response(res, 400, "Question already exists.", null);
      } else {
        const imgs = await cloudinary.uploader.upload(req.files.path);

        const newQuestion = await Question.create({
          question: req.body.question,
          options: req.body.options,
          answers: req.body.answers,
        });

        responseUtility.response(res, 201, "Question successfully created.", { id: newQuestion.id });
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getQuestion: async (req, res) => {
    try {
      const question = await Question.findOne({
        attributes: ["id", "question", "question_image_links", "options", "option_image_links", "updated_at", "created_at"],
        where: {
          id: req.params.id,
        },
      });

      if (!question) {
        responseUtility.response(res, 404, "Question not found.", null);
      } else {
        responseUtility.response(res, 200, "Get question successfully.", question);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const questionID = await Question.findByPk(req.params.id);

      if (!questionID) {
        responseUtility.response(res, 404, "Question not found.", null);
      } else {
        await Question.update(
          {
            question: req.body.question,
            options: req.body.options,
            answers: req.body.answers,
            updated_at: Date.now(),
          },
          {
            where: {
              id: questionID,
            },
          }
        );

        responseUtility.response(res, 200, "Question successfully updated.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const questionID = await Question.findByPk(req.params.id);

      if (!questionID) {
        responseUtility.response(res, 404, "Question not found.", null);
      } else {
        await Question.destroy({
          where: {
            id: questionID,
          },
        });

        responseUtility.response(res, 200, "Question successfully deleted.", null);
      }
    } catch (err) {
      responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = questionController;
