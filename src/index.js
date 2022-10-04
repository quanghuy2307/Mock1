const express = require("express");
const dotenv = require("./configs/env.config");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const sequelize = require("./configs/db.config");
const { Result, UserQuestion, UserOption, Token, User, Question, Options } = require("./models/index");

const app = express();

/*  */
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

/* View Engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

/*  */
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const console = require("console");

/*  */
app.use("/survey/auth", authRouter);
app.use("/survey/users", userRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect DB success.");
    app.listen(process.env.PORT, () => {
      console.log(`App listening at localhost:${process.env.PORT}.`);
    });
  })
  .catch(() => logger.error(`Connect DB fail ${process.env.PORT}.`));
