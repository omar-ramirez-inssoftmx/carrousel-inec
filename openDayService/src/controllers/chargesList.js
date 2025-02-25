const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);

// Función para obtener todos los cargos de un cliente sin preocuparse por la paginación
const getCustomerChargesCount = (customer_id) => {
    return new Promise((resolve, reject) => {
        // Función para obtener el primer y el último día del mes
        const getStartAndEndOfMonth = () => {
            const today = new Date(); // Fecha actual

            // Obtener el primer día del mes
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const startOfMonthFormatted = startOfMonth.toISOString().split('T')[0]; // Formato YYYY-MM-DD

            // Obtener el último día del mes
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const endOfMonthFormatted = endOfMonth.toISOString().split('T')[0]; // Formato YYYY-MM-DD

            return {
                startOfMonth: startOfMonthFormatted,
                endOfMonth: endOfMonthFormatted
            };
        };

        const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

        // Parámetros de búsqueda con fechas del mes en curso
        const searchParams = {
            'creation[gte]': startOfMonth, // Fecha de inicio del mes
            'creation[lte]': endOfMonth,   // Fecha de fin del mes
            limit: 100 // Puedes ajustar el límite según lo necesario
        };

        // Llamar a Openpay para obtener los cargos
        openpay.customers.charges.list(customer_id, searchParams, (error, charges) => {
            if (error) {
                reject(error);
            } else {
                resolve(charges.length); // Retornar el número total de cargos
            }
        });
    });
};

module.exports = {
  getCustomerChargesCount
};
