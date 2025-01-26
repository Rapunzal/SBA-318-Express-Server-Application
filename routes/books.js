const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
// const upload = multer({ dest: "public/data/uploads/" });

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

//upload file using multer package tested through Postman

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  res.json(req.file);
});

//Render Books via ejs to display list of books
router.route("/displayBooks").get((req, res) => {
  res.render("displayBooks", { bookList: books });
});

//Search by query parameter (title,author,category or isbn)
router.get("/search", (req, res, next) => {
  const { title, author, category, isbn } = req.query;
  let bookList;
  if (title) {
    bookList = books.filter((book) => book.title == title);
  }
  if (author) {
    bookList = books.filter(
      (book) => book.author.toLowerCase() == author.toLowerCase()
    );
  }
  if (category) {
    bookList = books.filter(
      (book) => book.category.toLowerCase() == category.toLowerCase()
    );
  }
  if (isbn) {
    bookList = books.filter((book) => book.isbn == isbn);
  }

  console.log(bookList);
  if (bookList.length > 0) {
    res.json(bookList);
  } else {
    next(error(400, "Cannot find books"));
  }
  console.log(req.query.isbn);
});

router
  .route("/:id")
  .get((req, res, next) => {
    const book = books.find((b) => {
      //console.log(b, " ", req.params.id);
      return b.id === Number(req.params.id);
    });

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
  })
  .put((req, res, next) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;

    const book = books.find((b, index) => {
      if (b.id === bookId) {
        books[index] = {
          id: bookId,
          ...updatedBook,
        };
        return true;
      }
    });
    if (book) {
      res.json(updatedBook);
    } else {
      next(error(400, " message: 'Book not found'"));
    }
  });

router.get("/books/*", (req, res) => {
  res.send(`Matched route: ${req.originalUrl}`);
});

module.exports = router;
