const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);
// Función para obtener el estado de un pedido a partir de los cargos de un cliente
const getCustomerChargesStatus = (customer_id, order_id) => {

    
  return new Promise((resolve, reject) => {
    const searchParams = {
      order_id,
    };

    // Llamar a Openpay para obtener los cargos
    openpay.customers.charges.list(customer_id, searchParams, (error, charges) => {
      if (error) {
        reject(error);
      } else {
        // Buscar el cargo asociado al pedido
        const charge = charges.find((charge) => charge.order_id === order_id);
        console.log("Cargo encontrado: ", charge)
        
        if (!charge) {
          return resolve(null); // No se encontró el cargo
        }
        

        resolve(charge);
       
        
      }
    });
  });
};

module.exports = {
  getCustomerChargesStatus,
};
