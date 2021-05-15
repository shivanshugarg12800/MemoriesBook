const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
// calling the express handlebars as exhbs
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");

// load config
dotenv.config({ path: "./config/config.env" });

// calling the connectDB function here
connectDB();

const app = express();
//ROUTES
app.use("/", require("./routes/index"));

//-----------------STATIC FOLDER----------------
app.use(express.static(path.join(__dirname, "public")));

//-----------logging--------------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//-------------------- handle bars----------------
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
