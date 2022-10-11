const Joi = require("joi");

const answerValidation = {
  createAnswer: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      answers: Joi.array()
        .items(
          Joi.object({
            question_id: Joi.number().required(),
            choices: Joi.array().items(Joi.number()).required(),
          })
        )
        .required(),
    }),
  }).unknown(true),

  getAnswer: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),

  deleteAnswer: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),
};

module.exports = answerValidation;
