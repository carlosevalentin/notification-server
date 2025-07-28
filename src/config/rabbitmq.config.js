const amqplib = require('amqplib');
require('dotenv').config();

let connection;

async function getConnection() {
  if (!connection) {
    connection = await amqplib.connect(process.env.RABBITMQ_URL);
  }
  return connection;
}

module.exports = { getConnection };
