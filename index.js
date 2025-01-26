const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const users = require("./routes/user");
const books = require("./routes/books");
const category = require("./routes/category");
const path = require("path");

const app = express();
const port = 3000;
const error = require("./utilities/error");

app.use("/static", express.static(path.join(__dirname, "public")));

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//EJS template engine
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));

//Third part package morgan middleware for logging
app.use(morgan("dev"));

//Custom Logging middleware
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});

// Custom middleware sub-stack that prints request info for any type of HTTP request on this path
app.use(
  "/api/books/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

app.use("/api/books", books);
app.use("/api/category", category);
app.use("/api/users", users);

app.get("/", (req, res) => {
  let siteName = "Library Management System";
  let search = "Search Now";
  let arr = [1, 2, 3, 4, 5, 6];
  res.render("index", { siteName: siteName, content: search }); //to render a view template
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(500).json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
