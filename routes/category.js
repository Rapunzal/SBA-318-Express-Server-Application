const express = require("express");
const router = express.Router();

const categories = require("../data/category");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.json({ categories });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.description) {
      const category = {
        id: categories[categories.length - 1].id + 1,
        name: req.body.name,
        description: req.body.description,
      };
      categories.push(category);
      res.json(categories[categories.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const category = categories.find((c) => c.id === Number(req.params.id));

    if (category) res.json({ category });
    else next(error(400, " Resource not found"));
  })
  .patch((req, res, next) => {
    const category = categories.find((c, i) => {
      if (c.id == req.params.id) {
        for (const key in req.body) {
          categories[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (category) res.json(category);
    else next();
  })
  .delete((req, res, next) => {
    const category = categories.find((c, index) => {
      if (c.id == req.params.id) {
        categories.splice(index, 1);
        return true;
      }
    });
    if (category) return res.json(category);
    else next();
  });

module.exports = router;
