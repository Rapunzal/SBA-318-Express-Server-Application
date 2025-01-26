const express = require("express");
const router = express.Router();

const users = require("../data/users");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.json(users);
  })
  .post((req, res, next) => {
    console.log(req.body);
    if (
      req.body.first_name &&
      req.body.last_name &&
      req.body.email &&
      req.body.phone &&
      req.body.address &&
      req.body.address.street &&
      req.body.address.city &&
      req.body.address.state &&
      req.body.address.postal_code &&
      req.body.address.country
    ) {
      const user = {
        id: users[users.length - 1].id + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        postalCode: req.body.address.postal_code,
        country: req.body.address.country,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next();
  });

//Render list of all users via ejs template to demonstrate rendering
router.route("/displayUser").get((req, res) => {
  res.render("displayUser", { userList: users });
});

//Register user via POST request through ejs template
router.route("/registerUser").get((req, res, next) => {
  res.render("registerUser");
});

// Route to match usernames with letters and numbers
router.get("/search/:username([a-zA-Z0-9]+)", (req, res) => {
  res.send(`User Profile: ${req.params.username}`);
});

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) return res.json({ user });
    else {
      next(error(400, "User Not found"));
    }
  })
  .patch((req, res, next) => {
    const user = users.find((u, index) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[index][key] = req.body[key];
        }
        return true;
      }
    });
    if (user) res.json(user);
    else next(error(400, "Failed to update user"));
  })
  .delete((req, res, next) => {
    const user = users.find((u, index) => {
      if (u.id == req.params.id) {
        users.splice(index, 1);
        return true;
      }
    });
    if (user) return res.json(user);
    else next();
  });

router.route("/delete/:id").delete((req, res, next) => {
  const user = users.find((u, index) => {
    if (u.id == req.params.id) {
      users.splice(index, 1);
      return true;
    }
  });
  if (user) return res.json(user);
  else next();
});

module.exports = router;
