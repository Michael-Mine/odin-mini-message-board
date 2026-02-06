const { Router } = require("express");
const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", (req, res) =>
  res.render("index", { title: "Mini Message Board", messages: messages }),
);
router.get("/new", (req, res) =>
  res.render("form", { title: "Add New Message" }),
);

router.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = router;
