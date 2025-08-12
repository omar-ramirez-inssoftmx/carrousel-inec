#!/bin/bash

echo "Iniciando proceso de deploy..."

# Hacer pull de los últimos cambios
git pull origin main
if [ $? -eq 0 ]; then
    echo "Cambios obtenidos correctamente"
else
    echo "Error al obtener cambios del repositorio"
    exit 1
fi

echo "Instalando dependencias..."

# Instalar dependencias
npm install
if [ $? -eq 0 ]; then
    echo "Dependencias instaladas correctamente"
else
    echo "Error al instalar dependencias"
    exit 1
fi

echo "Generando cliente de Prisma..."

# Generar cliente de Prisma
npx prisma generate
if [ $? -eq 0 ]; then
    echo "Cliente de Prisma generado correctamente"
else
    echo "Error al generar cliente de Prisma"
    exit 1
fi

# Nombre del proceso PM2
APP_NAME="inec-backend"

echo "Verificando procesos existentes de PM2..."

# Verificar si ya existe un proceso con el mismo nombre
if pm2 list | grep -q "$APP_NAME"; then
    echo "Proceso existente encontrado. Deteniendo $APP_NAME..."
    pm2 stop $APP_NAME
    pm2 delete $APP_NAME
    echo "Proceso anterior detenido y eliminado"
else
    echo "No se encontraron procesos existentes"
fi

echo "Iniciando aplicación con PM2..."

# Iniciar la aplicación con PM2 usando npm run dev
pm2 start npm --name "$APP_NAME" -- run dev

if [ $? -eq 0 ]; then
    echo "Aplicación iniciada correctamente con PM2"
    
    # Mostrar información del proceso
    echo ""
    echo "Estado actual de la aplicación:"
    pm2 show $APP_NAME
    
    echo ""
    echo "Comandos útiles:"
    echo "Para ver logs: pm2 logs $APP_NAME"
    echo "Para detener: pm2 stop $APP_NAME"
    echo "Para reiniciar: pm2 restart $APP_NAME"
    echo "Para monitorear: pm2 monit"
    
    echo "Deploy completado exitosamente!"
else
    echo "Error al iniciar la aplicación con PM2"
    exit 1
fi

# Guardar configuración de PM2
pm2 save

echo ""
echo "Deploy finalizado. La aplicación está corriendo en modo desarrollo con PM2."