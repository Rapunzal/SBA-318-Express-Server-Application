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
    console.log(req.body.title);
    console.log(req.body.category);
    console.log(req.body.author);

    if (
      req.body.title &&
      req.body.category &&
      req.body.author &&
      req.body.description &&
      req.body.price &&
      req.body.isbn
    ) {
      if (books.find((b) => b.title === req.body.title)) {
        next(error(409, "Book Name is already taken."));
      }

      const book = {
        id: books[books.length - 1].id + 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        isbn: req.body.isbn,
      };
      console.log(book, " ====book");
      books.push(book);

      res.json(books[books.length - 1]);
    } else {
      next(error(400, "Insufficient Data"));
    }
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const book = books.find((b) => {
      console.log(b, " ", req.params.id);
      return b.id === Number(req.params.id);
    });
    console.log(book, "books");
    if (book) res.json({ book });
    else next();
  })
  .patch((req, res, next) => {
    const book = books.find((book, i) => {
      if (book.id == req.params.id) {
        for (const key in req.body) {
          books[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (book) res.json(book);
    else next();
  })
  .delete((req, res, next) => {
    const book = books.find((book, i) => {
      if (book.id == req.params.id) {
        books.splice(i, 1);
        return true;
      }
    });

    if (book) res.json(book);
    else next();
  });

module.exports = router;
