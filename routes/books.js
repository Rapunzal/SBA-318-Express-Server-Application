const express = require("express");
const router = express.Router();
const fs = require("fs");

const books = require("../data/books");
const error = require("../utilities/error");
const filePath = "./data/books.js";

router
  .route("/")
  .get((req, res) => {
    res.json({ books });
  })
  .post((req, res, next) => {
    console.log(req.body.name);
    console.log(req.body.type);
    console.log(req.body.available);
    if (req.body.name && req.body.type && req.body.available) {
      if (books.find((b) => b.name === req.body.name)) {
        next(error(409, "Book Name is already taken."));
      }

      const book = {
        id: books[books.length - 1].id + 1,
        name: req.body.name,
        type: req.body.type,
        avaliable: req.body.available,
      };
      console.log(book, " ====book");
      books.push(book);
      //   fs.readFile(filePath, (err, data) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       obj = JSON.parse(data);
      //       obj.push(book);
      //       json = JSON.stringify(obj);
      //       fs.writeFile("./userdata.json", json, callback);
      //     }
      //   });
      res.json(books[books.length - 1]);
    } else {
      next(error(400, "Insufficient Data"));
    }
  });

router.route("/:id").get((req, res, next) => {
  const book = books.find((b) => {
    console.log(b, " ", req.params.id);
    return b.id === Number(req.params.id);
  });
  console.log(book, "books");
  if (book) res.json({ book });
  else next();
});

module.exports = router;
