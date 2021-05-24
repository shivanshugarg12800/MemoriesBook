const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoDbStore = require("connect-mongo");
// calling the express handlebars as exhbs
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");

// load config
dotenv.config({ path: "./config/config.env" });

// passport config
require("./config/passport")(passport);

// calling the connectDB function here
connectDB();

const app = express();

// --------------BODY PARSER--------------------
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//-----------logging--------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//-----------------HANDLEBARS HELPER----------------
const { formatDate, stripTags, truncate, editIcon } = require("./helpers/hbs");

//-------------------- handle bars----------------
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//-----------------STATIC FOLDER----------------
app.use(express.static(path.join(__dirname, "public")));

//-------------------- SESSIONS---------------
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // it stores the session when we logged in for the first time, so that the reload or any internet connectivity
    // issue doesnot log out us from the application
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

//---------------PASSPORT MIDDLEWARE-------------
app.use(passport.initialize());
app.use(passport.session());

//-----------------SET GLOBAL VARIABLE-----------------
// this middle ware is used to make the user as a global variable so that it can be used in the index.hbs
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//---------------------ROUTES-------------------
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
