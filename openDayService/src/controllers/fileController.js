const xlsx = require('xlsx');
const fs = require('fs');
const { createAlumno, createPedido, createProduct } = require('../models/customerModel')
const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);


const columnMapping = {
    "Matrícula *": "matricula",
    "Nombre(s) *": "nombre",
    "Apellido Paterno*": "apellido_paterno",
    "Apellido Materno": "apellido_materno",
    "Celular": "celular",
    "Correo *": "correo",
    "Pago": "pago",
    "Fecha de Vencimiento Pago": "fecha_vencimiento_pago",
    "Tipo de Pago": "tipo_pago",
    "Producto / Servicio Motivo de pago": "producto_servicio_motivo_pago",
    "Concepto de pago *": "concepto_pago",
    "Ciclo": "ciclo",
    "Mes": "mes",
    "Año": "anio"
};

// Controlador para manejar la carga y lectura del archivo
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = 'Alumnos - Carga Masiva';
        const worksheet = workbook.Sheets[sheetName];

        // Convertimos la hoja a un array de arrays
        let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

        // Filtramos la primera fila con encabezados reales (ignorando comentarios)
        let headerRowIndex = data.findIndex(row => row.some(cell => {

            console.log("typeof cell ", typeof cell)
            if (typeof cell !== 'string') return false;
            console.log("Object.keys(columnMapping).some(key => cell.includes(key)); ", Object.keys(columnMapping).some(key => cell.includes(key)))
            return Object.keys(columnMapping).some(key => cell.includes(key));
        }));

        console.log("headerRowIndex ", headerRowIndex)

        if (headerRowIndex === -1) {
            return res.status(400).json({ error: 'No se encontraron encabezados válidos en el archivo' });
        }

        // Limpiar los encabezados de comentarios, espacios extra, saltos de línea, etc.
        const headers = data[headerRowIndex].map(header => {
            if (typeof header !== 'string') return ""; // Ignorar celdas vacías o no string
            return header.replace(/[\n\r]/g, " ").trim(); // Quitar saltos de línea y espacios
        });

        // Filtrar las filas vacías
        const filteredData = data.slice(headerRowIndex + 1).filter(row => row.some(cell => cell !== null && cell !== ''));
      
        for (const row of filteredData) {
            console.log("row[index]  ", row[0]);
            console.log("row[index]  ", row[1]);
            console.log("row[index]  ", row[3]);
            console.log("row[index]  ", row[4]);
            console.log("row[index]  ", row[5]);
            console.log("row[index]  ", row[6]);
            console.log("row[index]  ", row[7]);
            console.log("row[index]  ", row[8]);
            console.log("row[index]  ", row[9]);
            console.log("row[index]  ", row[10]);
            console.log("row[index]  ", row[11]);
            console.log("row[index]  ", row[13]);
            
        
            try {

                //const resultProducto = await createProduct("producto", 0, row[10], "2025-12-31");

                //console.log("resultProducto---> ", resultProducto);
                
                
                const customerData = {
                    external_id: row[0],
                    name: row[1],
                    last_name: row[2] + ' ' + row[3],
                    email: row[5].trim(),
                    phone_number: row[4]
                };
                
                const customer = await findOrCreateCustomer(customerData);
                console.log("customer", customer);
                
             
                const resultAlumno = await createAlumno(row[0], row[1], row[2], row[3], row[5].trim(), row[4], customer.id);
                
                
                console.log("resultAlumno---> ", resultAlumno);

                const ciclo = parseInt(row[11]) || 0;
                const mesInicial = parseInt(row[12]) || 1;
                const anio = parseInt(row[13]) || new Date().getFullYear();

                for (let i = 0; i < ciclo; i++) {
                    const mesActual = mesInicial + i;
                    let mes = mesActual;
                    let anioActual = anio;
                    
                    // Si el mes supera 12, ajustamos al año siguiente
                    if (mesActual > 12) {
                        mes = mesActual % 12 || 12;
                        anioActual += Math.floor((mesActual - 1) / 12);
                    }
                    
                    await createPedido(
                        resultAlumno, 
                        null, 
                        null, 
                        0, 
                        3, 
                        row[8],
                        row[9],
                        row[10],
                        ciclo,
                        mes,
                        anioActual,
                        parseFloat(row[6]) || 0,
                        excelSerialToDate(row[7]),
                        null,
                        row[10],
                        null,
                        new Date().toISOString().split('T')[0],
                        null,
                        0.00
                    );
                }
          

                /*await createPedido(
                    resultAlumno, 
                    null, // identificador_pago
                    null, // identificador_pedido
                    resultProducto, 
                    3, // id_cat_estatus (asumiendo que 3 es "Por pagar" o similar)
                    row[8],
                    row[9],
                    row[10],
                    parseInt(row[11]) || 0,
                    parseInt(row[12]) || 1,
                    parseInt(row[13]) || new Date().getFullYear(),
                    parseFloat(row[6]) || 0,
                    excelSerialToDate(row[7]),
                    null, // link_de_pago (se generará después)
                    row[10],
                    null, // transaccion_Id
                    new Date().toISOString().split('T')[0], // fecha_carga (hoy)
                    null, // fecha_pago
                    0.00 // monto_real_pago
                );*/
                
            } catch (error) {
                console.error(`Error al insertar el alumno con matrícula ${row[0]}:`, error.message);
            }
                   
        }            

        res.json({ message: "Proceso de carga completado" });
        fs.unlinkSync(filePath);

    } catch (error) {
        console.log("error ", error);
        res.status(500).json({ error: 'Error al procesar el archivo', details: error.message });
    }
};
function excelSerialToDate(excelSerialDate) {
    console.log("excelSerialDate ", excelSerialDate)
    if (typeof excelSerialDate === 'undefined' || !excelSerialDate || isNaN(parseFloat(excelSerialDate))) {
        return null; // Devolver una fecha por defecto si el valor es vacío, no válido o undefined
    }

    const date = new Date(Math.round((excelSerialDate - 25569) * 86400 * 1000));
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // Obtener el desplazamiento de la zona horaria en milisegundos
    const adjustedDate = new Date(date.getTime() + timezoneOffset); // Ajustar la fecha teniendo en cuenta la zona horaria

    const year = adjustedDate.getFullYear();
    const month = adjustedDate.getMonth() + 1;
    const day = adjustedDate.getDate();

    return `${year}-${month}-${day}`;
}


const findOrCreateCustomer = async (customerData) => {
    const { external_id, name, last_name, email, phone_number } = customerData;

    try {
        // Buscar cliente en Openpay
        const customers = await new Promise((resolve, reject) => {
            openpay.customers.list({ external_id }, (error, customers) => {
                if (error) return reject(error);
                resolve(customers);
            });
        });

        if (customers.length > 0) {
            console.log("Cliente encontrado:", customers[0]);
            return customers[0]; // Retornar el primer cliente encontrado
        }

        // Si no se encontró, crear nuevo cliente
        const newCustomer = await new Promise((resolve, reject) => {
            openpay.customers.create({ name, last_name, email, phone_number, external_id }, (error, customer) => {
                if (error) return reject(error);
                resolve(customer);
            });
        });

        console.log("Cliente creado:", newCustomer);
        return newCustomer;
    } catch (error) {
        console.error("Error en Openpay:", error);
        throw error;
    }
};

const findOrCreateOrder = async(OrderData)=>{
    const { customer_id, description, amount, matricula} = OrderData;

    try {

        const dueDate = new Date();
        dueDate.setHours(dueDate.getHours() + 1); // Seteamos la hora de vencimiento
        const isoDueDate = dueDate.toISOString();

        var chargeRequest = {
            method: "card",
            amount,
            description,
            order_id: matricula+ "-" + new Date().getTime(), // ID único por pedido
            send_email: true,
            confirm: false,
            redirect_url: "http://localhost:3000/payment-success",
            due_date: isoDueDate,
        };

        const newOrder = await new Promise((resolve, reject) => {
            openpay.customers.charges.create(customer_id, chargeRequest, (error, order) => {
                if (error) {
                    console.error("Error al crear el pedido:", error);
                    return res.status(400).json({ error: error.description });
                }
    
                return  order.payment_method?.url || "No se generó un link de pago";
                
            });
        });
        return newOrder;
    } catch (error) {
        
    }
}

module.exports = { uploadFile };

