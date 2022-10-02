const express = require("express");
const dotenv = require("./configs/env.config");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

/*  */
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

/* View Engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const authRouter = require("./routes/auth.route");

/*  */
app.use("/survey/auth", authRouter);

app.listen(process.env.PORT, () => console.log(`App listening at localhost:${process.env.PORT}`));
