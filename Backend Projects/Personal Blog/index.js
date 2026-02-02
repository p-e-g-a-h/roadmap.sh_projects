const express = require("express");
const store = require("./store");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const authentication = (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader) {
    res.set("WWW-Authenticate", 'Basic realm="401"');
    return res.status(401).send("Authentication required.");
  }

  const [user, pass] = Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (
    user === process.env.ADMIN_USERNAME &&
    pass === process.env.ADMIN_PASSWORD
  ) {
    return next();
  }
  res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required.");
};

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index", { articles: await store.getAllData() });
});

app.get("/article/:id", async (req, res) => {
  const item = await store.getById(req.params.id);
  if (!item) {
    return res.status(404).render("404");
  }
  res.render("article", { article: item });
});

app.get("/admin", authentication, async (req, res) => {
  res.render("admin", { articles: await store.getAllData() });
});

app.get("/new", authentication, (req, res) => {
  res.render("new");
});

app.post("/new", authentication, async (req, res) => {
  const { title, content } = req.body;
  await store.add(title, content);
  res.redirect("/admin");
});

app.post("/delete/:id", authentication, async (req, res) => {
  await store.remove(req.params.id);
  res.redirect("/admin");
});

app.get("/edit/:id", authentication, (req, res) => {
  res.render("edit", { id: req.params.id });
});

app.post("/edit/:id", authentication, async (req, res) => {
  const { title, content } = req.body;
  await store.edit(req.params.id, title, content);
  res.redirect("/admin");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
