require('dotenv').config();
const { getConnection } = require('../config/rabbitmq.config');
const { publishToQueue } = require('../producers/notification.producer');
const { setStatus } = require('../services/status.service');

const inputQueue = 'fila.notificacao.entrada.carlos-eduardo';
const statusQueue = 'fila.notificacao.status.carlos-eduardo';

async function startConsumer() {
  const conn = await getConnection();
  const channel = await conn.createChannel();
  await channel.assertQueue(inputQueue, { durable: true });

  channel.consume(inputQueue, async (msg) => {
    if (!msg) return;
    const { mensagemId } = JSON.parse(msg.content.toString());

    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));

    const success = Math.floor(Math.random() * 10) + 1 > 2;
    const status = success ? 'PROCESSADO_SUCESSO' : 'FALHA_PROCESSAMENTO';

    setStatus(mensagemId, status);

    await publishToQueue(statusQueue, { mensagemId, status });

    channel.ack(msg);
  });
}

module.exports = { startConsumer };
