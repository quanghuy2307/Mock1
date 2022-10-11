const Joi = require("joi");

const authValidation = {
  registerAccount: Joi.object({
    body: Joi.object({
      full_name: Joi.string().alphanum().min(3).max(50).required(),
      birthday: Joi.string().required(),
      sex: Joi.string().required().valid("male", "female", "others"),
      address: Joi.string().required(),
      phone: Joi.string()
        .pattern(/[0-9]{10}/)
        .required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }).unknown(true),

  loginAccount: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }).unknown(true),

  logoutAccount: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }).unknown(true),
};

module.exports = authValidation;
