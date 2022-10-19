const responseUtility = {
  response: (res, status, msg, data) => {
    return res.status(status).json({ message: msg, data: { ...data } });
  },
};

module.exports = responseUtility;
