const db = require("../db/queries");

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

async function newMessagePost(req, res) {
  const newMessage = {
    name: req.body.name,
    added: new Date(),
    text: req.body.message,
  };
  await db.insertMessage(newMessage);
  res.redirect("/");
}

module.exports = {
  getAllMessages,
  getMessageId,
  newMessageGet,
  newMessagePost,
};
