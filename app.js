const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
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

//-----------logging--------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//-------------------- handle bars----------------
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//-----------------STATIC FOLDER----------------
app.use(express.static(path.join(__dirname, "public")));

//-------------------- SESSIONS---------------
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//---------------PASSPORT MIDDLEWARE-------------
app.use(passport.initialize());
app.use(passport.session());

//---------------------ROUTES-------------------
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
