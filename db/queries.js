const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessage(messageId) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    messageId,
  ]);
  return rows;
}

async function insertMessage({ name, added, text }) {
  await pool.query(
    "INSERT INTO messages (name, added, text) VALUES ($1, $2, $3)",
    [name, added, text],
  );
  getAllMessages();
}

module.exports = {
  getAllMessages,
  getMessage,
  insertMessage,
};
