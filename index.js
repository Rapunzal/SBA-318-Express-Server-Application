const express = require("express");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const users = require("./routes/user");
const books = require("./routes/books");
const category = require("./routes/category");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
const error = require("./utilities/error");

//Virtual Path Prefix
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
  const log = `${req.method} ${req.hostname} ${req.path} ${
    req.time
  } ${new Date().toISOString()}\n`;
  next();

  fs.appendFile(path.join(__dirname, "access.log"), log, (err) => {
    if (err) {
      console.error("Failed to log error to file");
    }
  });
  console.log(log);
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

//to render a add book template for making post request using form
app.get("/", (req, res) => {
  let siteName = "Library Management System";
  res.render("index", { siteName: siteName });
});

// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/books",
        rel: "books",
        type: "GET",
      },
      {
        href: "api/books",
        rel: "books",
        type: "POST",
      },
      {
        href: "api/category",
        rel: "category",
        type: "GET",
      },
      {
        href: "api/category",
        rel: "category",
        type: "POST",
      },
    ],
  });
});
// // For invalid routes
// app.get("*", (req, res) => {
//   res.send("404! This is an invalid URL.");
// });
//Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  const errorLog = `${err.stack} - ${new Date().toISOString()}\n`;
  //writing error log to file
  fs.appendFile(path.join(__dirname, "error.log"), errorLog, (err) => {
    if (err) {
      console.error("Failed to write error to file");
    }
  });

  console.error(errorLog);
  // res.status(500).send("Internal Server Error");

  res.status(500).json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
