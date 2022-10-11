const Joi = require("joi");

const authValidation = {
  getQuestions: Joi.object({
    query: Joi.object({
      question: Joi.string().optional(),
      size: Joi.number().integer().optional(),
      page: Joi.number().integer().optional(),
    }),
  }).unknown(true),

  createQuestion: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string()).required(),
      answers: Joi.array().items(Joi.number()).required(),
    }),
  }).unknown(true),

  getQuestion: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),

  updateQuestion: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string()).required(),
      answers: Joi.array().items(Joi.number()).required(),
    }),
  }).unknown(true),

  deleteQuestion: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),
};

module.exports = authValidation;
