require('dotenv').config();
const app = require('./app');

const { startConsumer } = require('./consumers/notification.consumer');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  startConsumer();
});
