const express = require("express");
const dotenv = require("./configs/env.config");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./configs/db.config");

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
    app.listen(process.env.PORT, () => {
      console.log(`App listening at localhost:${process.env.PORT}.`);
    });
  })
  .catch(() => logger.error(`Connect DB fail ${process.env.PORT}.`));

sequelize
  .sync({
    /* alter: true */
  })
  .then(() => {
    console.log("Sync Tables success!");
  })
  .catch((err) => {
    console.log("Sync Tables fail!");
    console.log(err);
  });
