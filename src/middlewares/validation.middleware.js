const { responseUtility } = require("../utilities/index");

const validationMiddleware = {
  validate: (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req);

    if (error) {
      return responseUtility.response(res, 400, error.details[0].message, null);
    }

    next();
  },
};

module.exports = validationMiddleware;
