const { getConnection } = require('../config/rabbitmq.config');

async function publishToQueue(queue, message) {
  const conn = await getConnection();
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}

module.exports = { publishToQueue };
