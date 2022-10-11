const Joi = require("joi");

const authValidation = {
  registerAccount: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
      username: Joi.string().required(),
      full_name: Joi.string().required(),
      birthday: Joi.string().required(),
      sex: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
    }),

    getAccessToken: {
      body: Joi.object().keys({
        refreshToken: Joi.string().required(),
      }),
    },

    getRefreshToken: {
      body: Joi.object().keys({
        refreshToken: Joi.string().required(),
      }),
    },
  },

  loginAccount: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};

module.exports = authValidation;
