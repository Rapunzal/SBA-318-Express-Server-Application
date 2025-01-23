const express = require("express");
const app = express();
const port = 3000;

//EJS template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let siteName = "Library";
  let search = "Search Now";
  let arr = [1, 2, 3, 4, 5, 6];
  res.render("index", { siteName: siteName, content: search }); //to render a view template
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
