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
    "Pago con descuento": "pago_con_descuento",
    "Fecha de Vencimiento Pago con descuento": "fecha_vencimiento_descuento",
    "Pago sin descuento": "pago_sin_descuento",
    "Fecha de Vencimiento Pago sin descuento": "fecha_vencimiento_sin_descuento",
    "Pago con RECARGO": "pago_con_recargo",
    "Fecha de Vencimiento Pago con RECARGO": "fecha_vencimiento_recargo",
    "Producto / Servicio Motivo de pago": "motivo_pago",
    "Concepto de pago *": "concepto_pago"
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
            if (typeof cell !== 'string') return false;
            return Object.keys(columnMapping).some(key => cell.includes(key));
        }));

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
            
        
            try {

                const resultProducto = await createProduct("producto", 1500, row[12], "2025-02-28");

                console.log("resultProducto---> ", resultProducto);

                const resultAlumno = await createAlumno(row[0], row[1], row[2], row[3], row[5], row[4]);

                
                (async () => {
                    const customerData = {
                        external_id: row[0],
                        name: row[1],
                        last_name: row[2] + ' '+ row[3],
                        email: row[5],
                        phone_number: row[4]
                    };
                
                    try {
                        const customer = await findOrCreateCustomer(customerData);                        
                    } catch (error) {
                        console.error("Error en la búsqueda o creación del cliente:", error);
                    }
                })();
                
                
                console.log("resultAlumno---> ", resultAlumno);

                await createPedido(resultAlumno, null, null, resultProducto, 3, row[6], excelSerialToDate(row[7]), row[8], excelSerialToDate(row[9]), row[10], excelSerialToDate(row[11]))

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

function excelSerialToDate(serial) {
    // Excel considera que el 1 de enero de 1900 es el día 1
    const excelEpoch = new Date(1900, 0, 1);
    
    // Restar 1 porque Excel considera incorrectamente que 1900 fue un año bisiesto
    const date = new Date(excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
    
    // Formatear la fecha como YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');    
    
    return year + '-' + month + '-' + day;
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
module.exports = { uploadFile };




    