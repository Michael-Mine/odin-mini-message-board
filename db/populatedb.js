#! /usr/bin/env node

const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  added TIMESTAMP WITH TIME ZONE,
  text TEXT
);

INSERT INTO messages (name, added, text) 
VALUES
  ('Amando', '2026-02-06 19:42:32+00', 'Hi there!'),
  ('Charles', '2026-02-06 19:42:32+00', 'Hello World!'),
  ('Mr Mine', '2026-02-06 19:51:31+00', 'Welcome to my message board!'),
  ('add', '2026-02-06 21:18:34+00', 'ee'),
  ('rectum', '2026-02-07 22:57:40+00', 'macaroni'),
  ('Wa', '2026-02-11 15:25:12+00', 'What's up'),
  ('Udbhav', '2026-02-12 16:32:50+00', 'Hello Odinites!');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
