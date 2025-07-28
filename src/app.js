const express = require('express');
const notificationRoutes = require('./api/routes/notification.routes');

const app = express();
app.use(express.json());

app.use('/api', notificationRoutes);

module.exports = app;
