const xlsx = require('xlsx');
const fs = require('fs');

const columnMapping = {
    "Matrícula": "matricula",
    "Nombre(s) *": "nombre",
    "Apellido Paterno*": "apellido_paterno",
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
const uploadFile = (req, res) => {
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

        // Extraemos los datos a partir de la fila siguiente
        const jsonData = filteredData.map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                const key = columnMapping[header] || null;
                if (key) {
                    obj[key] = row[index] !== undefined ? row[index] : "";
                }
            });
            return obj;
        });

        res.json(jsonData);
        fs.unlinkSync(filePath);

    } catch (error) {
        console.log("error ", error);
        res.status(500).json({ error: 'Error al procesar el archivo' });
    }
};
module.exports = { uploadFile };




    