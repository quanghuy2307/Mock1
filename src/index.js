const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { dotenv, sequelize } = require("./configs/index");

const app = express();

/**
 *
 */
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

/**
 *
 */
const { authRouter, userRouter, questionRouter, resultRouter, answerRouter, homeRouter } = require("./routes/index");

app.use("/survey/auth", authRouter);
app.use("/survey/user", userRouter);
app.use("/survey/result", resultRouter);
app.use("/survey/question", questionRouter);
app.use("/survey/answer", answerRouter);
app.use("/survey/", homeRouter);

/**
 *
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connect DB success.");
  })
  .catch(() => logger.error(`Connect DB fail ${process.env.PORT}.`));

/**
 *
 */
sequelize
  .sync({
    /* alter: true */
  })
  .then(() => {
    console.log("Sync Tables success!");
  })
  .catch((err) => {
    console.log("Sync Tables fail!");
  });

/**
 *
 */
app.listen(process.env.PORT, () => {
  console.log(`App listening at localhost:${process.env.PORT}.`);
});
