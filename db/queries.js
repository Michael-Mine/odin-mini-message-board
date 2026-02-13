const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  console.log(rows);
  return rows;
}

async function getMessage(messageId) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [
    messageId,
  ]);
  console.log(rows);
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

insertMessage({
  name: "test",
  added: "2026-02-12 16:32:50+00",
  text: "insert test",
});
