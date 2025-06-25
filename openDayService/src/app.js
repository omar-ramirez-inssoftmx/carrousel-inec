require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors'); // Importa el paquete cors
const authMiddleware = require('./middlewares/authMiddleware');
const { obtenerExpresionCronUpdateStatus, obtenerExpresionCronRecargos } = require('./models/cronModel');

const cron = require("node-cron");

const app = express();

app.use(cors()); // Esto permite solicitudes desde cualquier origen
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cada 5 min
const { procesoProgramadoUpdateStatus } = require('./utils/CronOpenPay');

// Función para iniciar el CRON dinámicamente
const iniciarCronJobUpdateStatus = async () => {
  const expresionCronUpdateStatus = await obtenerExpresionCronUpdateStatus(); // Obtener la expresión desde la BD  
  cron.schedule(expresionCronUpdateStatus, () => {
    console.log(` Tarea programada ejecutándose con expresión: ${expresionCronUpdateStatus}`);
    procesoProgramadoUpdateStatus();
  });

  console.log(`CRON job iniciado con la expresión: ${expresionCronUpdateStatus}`);
};

const { procesoProgramadoRecargo } = require('./utils/CronRecargo');

// Función para iniciar el CRON dinámicamente
const iniciarCronJobRecardo = async () => {
  const expresionCronRecargo = await obtenerExpresionCronRecargos(); // Obtener la expresión desde la BD  
  cron.schedule(expresionCronRecargo, () => {
    console.log(` Tarea programada ejecutándose con expresión: ${expresionCronRecargo}`);
    procesoProgramadoRecargo();
  });

  console.log(`CRON job iniciado Recargo con la expresión: ${expresionCronRecargo}`);
};

// Iniciar el cron job
iniciarCronJobUpdateStatus();
iniciarCronJobRecardo();

// Rutas públicas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas protegidas
const chargeRoutes = require('./routes/chargeRoutes');
app.use('/api/charges', authMiddleware, chargeRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', customerRoutes);

const ordersRoutes = require('./routes/ordersRoutes');
app.use('/api/orders', ordersRoutes);

const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);

const selectStudentRoutes = require('./routes/selectStudentRoutes');
app.use('/api/student', selectStudentRoutes);

const cancelRoutes = require('./routes/cancelRoutes');
app.use('/api/cancel', cancelRoutes);

const cardRoutes = require('./routes/cardRoutes');
app.use('/api/payment/method', cardRoutes);

// Error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
