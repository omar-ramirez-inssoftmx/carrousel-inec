import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cron from 'node-cron';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { procesoProgramadoUpdateStatus } from './utils/CronOpenPay.js';
import { procesoProgramadoRecargo } from './utils/CronRecargo.js';

const iniciarCronJobUpdateStatus = async () => {
  cron.schedule("*/5 * * * *", () => procesoProgramadoUpdateStatus());
};

const iniciarCronJobRecardo = async () => {
  cron.schedule("*/5 * * * *", () => procesoProgramadoRecargo());
};

iniciarCronJobUpdateStatus();
iniciarCronJobRecardo();

import studentRoutes from './routes/studentRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

app.use('/api/students', studentRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/payment/method', cardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
