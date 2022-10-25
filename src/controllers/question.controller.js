const { Question } = require("../models/index");
const { Op } = require("sequelize");
const { paginationUtility, responseUtility } = require("../utilities/index");
const { cloudinary } = require("../configs/index");

const questionController = {
  getQuestions: async (req, res) => {
    try {
      const { page, size, question } = req.query;
      const { limit, offset } = paginationUtility.getPagination(page, size);

      const data = await Question.findAndCountAll({
        attributes: ["id", "question", "question_img_links", "options", "option_img_links", "updated_at", "created_at"],
        where: (condition = question ? { question: { [Op.like]: `%${question}%` } } : null),
        offset: offset,
        limit: limit,
      });

      const response = paginationUtility.getPagingData(data, page, limit);

      if (response.current_items.length) {
        return responseUtility.response(res, 200, "Get question successfully.", response);
      } else {
        return responseUtility.response(res, 404, "Question not found.", null);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
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
        return responseUtility.response(res, 400, "Question already exists.", null);
      } else {
        const questionImgLinks = [];
        const optionImgLinks = [];

        for (const question_img of req.files.question_imgs) {
          // map, foreach khong dung duoc async, await
          const questionImg = await cloudinary.uploader.upload(question_img.path);
          questionImgLinks.push(questionImg.secure_url);
        }

        for (const option_img of req.files.option_imgs) {
          const optionImg = await cloudinary.uploader.upload(option_img.path);
          optionImgLinks.push(optionImg.secure_url);
        }

        const newQuestion = await Question.create({
          question: req.body.question,
          question_img_links: questionImgLinks,
          options: req.body.options,
          option_img_links: optionImgLinks,
          answers: req.body.answers,
        });

        return responseUtility.response(res, 201, "Question successfully created.", {
          id: newQuestion.id,
          question: newQuestion.question,
          question_img_links: questionImgLinks,
          options: newQuestion.questions,
          option_img_links: optionImgLinks,
          updated_at: newQuestion.updated_at,
          created_at: newQuestion.created_at,
        });
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  getQuestion: async (req, res) => {
    try {
      const question = await Question.findOne({
        attributes: ["id", "question", "question_img_links", "options", "option_img_links", "updated_at", "created_at"],
        where: {
          id: req.params.id,
        },
      });

      if (!question) {
        return responseUtility.response(res, 404, "Question not found.", null);
      } else {
        return responseUtility.response(res, 200, "Get question successfully.", question.dataValues);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const questionID = await Question.findByPk(req.params.id);

      if (!questionID) {
        return responseUtility.response(res, 404, "Question not found.", null);
      } else {
        const questionImgLinks = [];
        const optionImgLinks = [];

        for (const question_img of req.files.question_imgs) {
          // map, foreach khong dung duoc async, await
          const questionImg = await cloudinary.uploader.upload(question_img.path);
          questionImgLinks.push(questionImg.secure_url);
        }

        for (const option_img of req.files.option_imgs) {
          const optionImg = await cloudinary.uploader.upload(option_img.path);
          optionImgLinks.push(optionImg.secure_url);
        }

        await Question.update(
          {
            question: req.body.question,
            question_img_links: questionImgLinks,
            options: req.body.options,
            option_img_links: optionImgLinks,
            answers: req.body.answers,
            updated_at: Date.now(),
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        const newQuestion = await Question.findOne({
          attributes: ["id", "question", "question_img_links", "options", "option_img_links", "updated_at", "created_at"],
          where: {
            id: req.params.id,
          },
        });

        return responseUtility.response(res, 200, "Question successfully updated.", newQuestion.dataValues);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },

  deleteQuestion: async (req, res) => {
    try {
      const questionID = await Question.findByPk(req.params.id);

      if (!questionID) {
        return responseUtility.response(res, 404, "Question not found.", null);
      } else {
        await Question.destroy({
          where: {
            id: req.params.id,
          },
        });

        return responseUtility.response(res, 200, "Question successfully deleted.", null);
      }
    } catch (err) {
      return responseUtility.response(res, 500, "Internal server error.", null);
    }
  },
};

module.exports = questionController;
