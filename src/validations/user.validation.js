const Joi = require("joi");

const userValidation = {
  getUsers: Joi.object({
    query: Joi.object({
      full_name: Joi.string().optional(),
      size: Joi.number().integer().optional(),
      page: Joi.number().integer().optional(),
    }),
  }).unknown(true),

  getUser: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),

  updateUser: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      full_name: Joi.string().alphanum().min(3).max(50).required(),
      birthday: Joi.string().required(),
      sex: Joi.string().valid("male", "female", "others").required(),
      address: Joi.string().required(),
      phone: Joi.string()
        .pattern(/[0-9]{10}/)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }).unknown(true),

  deleteUser: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),
};

module.exports = userValidation;
