const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { publishToQueue } = require('../../producers/notification.producer');
require('dotenv').config();

const inputQueue = 'fila.notificacao.entrada.carlos-eduardo';

router.post('/notification', async (req, res) => {
  const { mensagemId = uuidv4(), contentMessage } = req.body;

  if (!contentMessage || typeof contentMessage !== 'string') {
    return res.status(400).json({ erro: 'contentMessage inválido.' });
  }

  await publishToQueue(inputQueue, {
    mensagemId,
    contentMessage,
  });

  return res.status(202).json({
    mensagem: 'Mensagem recebida e será processada.',
    mensagemId,
  });
});

module.exports = router;
