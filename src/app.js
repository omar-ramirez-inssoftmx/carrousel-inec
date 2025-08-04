require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cron = require("node-cron");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { procesoProgramadoUpdateStatus } = require('./utils/CronOpenPay');
const { procesoProgramadoRecargo } = require('./utils/CronRecargo');

const iniciarCronJobUpdateStatus = async () => {
  cron.schedule("*/5 * * * *", () => procesoProgramadoUpdateStatus());
};

const iniciarCronJobRecardo = async () => {
  cron.schedule("*/5 * * * *", () => procesoProgramadoRecargo());
};

iniciarCronJobUpdateStatus();
iniciarCronJobRecardo();

const studentRoutes = require('./routes/studentRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const fileRoutes = require('./routes/fileRoutes');
const cardRoutes = require('./routes/cardRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/payment/method', cardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
