const httpStatus = require("http-status");
const { Answer } = require("../models/index");
const bcrypt = require("bcrypt");

const answerController = {
  createAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  getAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  updateAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },

  deleteAnswer: async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Successfully.", data: null });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error.", data: null });
    }
  },
};

module.exports = answerController;
