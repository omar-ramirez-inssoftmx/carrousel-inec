require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cron = require("node-cron");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { procesoProgramadoUpdateStatus } = require('./utils/CronOpenPay');
const { procesoProgramadoRecargo } = require('./utils/CronRecargo');

const iniciarCronJobUpdateStatus = async () => {
  cron.schedule("*/5 * * * *", () => {
    procesoProgramadoUpdateStatus();
  });
  console.log(`CRON job iniciado con la expresión: ${expresionCronUpdateStatus}`);
};

const iniciarCronJobRecardo = async () => { 
  cron.schedule("*/5 * * * *", () => {
    procesoProgramadoRecargo();
  });
  console.log(`CRON job iniciado Recargo con la expresión: ${expresionCronRecargo}`);
};

iniciarCronJobUpdateStatus();
iniciarCronJobRecardo();

const authRoutes = require('./routes/authRoutes');
const chargeRoutes = require('./routes/chargeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const fileRoutes = require('./routes/fileRoutes');
const selectStudentRoutes = require('./routes/selectStudentRoutes');
const cancelRoutes = require('./routes/cancelRoutes');
const cardRoutes = require('./routes/cardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/charges', chargeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/student', selectStudentRoutes);
app.use('/api/cancel', cancelRoutes);
app.use('/api/payment/method', cardRoutes);

app.listen(3000, () => console.log(`Server running on port 3000`));
