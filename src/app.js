const express = require('express');
const notificationRoutes = require('./api/routes/notification.routes');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200', // ou '*' se quiser liberar para todos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use('/api', notificationRoutes);

module.exports = app;
