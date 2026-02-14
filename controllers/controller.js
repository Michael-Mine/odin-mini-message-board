const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";
const textErr = "must be between 1 and 300 characters.";

const validateMessage = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lengthErr}`),
  body("message")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage(`Message ${textErr}`),
];

async function getAllMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Mini Message Board", messages: messages });
}

async function getMessageId(req, res) {
  const message = await db.getMessage(req.params.messageId);
  res.render("message", { title: "Message", message: message[0] });
}

function newMessageGet(req, res) {
  res.render("form", { title: "Add New Message" });
}

const newMessagePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Add New Message",
        errors: errors.array(),
      });
    }

    const { name, message } = matchedData(req);
    const added = new Date();
    await db.insertMessage({ name, added, text: message });
    res.redirect("/");
  },
];

module.exports = {
  getAllMessages,
  getMessageId,
  newMessageGet,
  newMessagePost,
};
