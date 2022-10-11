const validationMiddleware = {
  validate: (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req);

    if (error) {
      return res.status(400).json({ message: error.details[0].message, data: null });
    }

    next();
  },
};

module.exports = validationMiddleware;
