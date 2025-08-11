-- Insertar los datos basados en el análisis del código
-- Mapeo encontrado en openpayService.js - mapOpenpayStatusToDBStatus:
-- id_cat_estatus: 1 = COMPLETADO/PAGADO (COMPLETED)
-- id_cat_estatus: 2 = CANCELADO/FALLIDO (CANCELLED, FAILED, REFUNDED, CHARGEBACK_*)
-- id_cat_estatus: 3 = PENDIENTE (IN_PROGRESS, CHARGE_PENDING, usado por defecto al crear órdenes)

INSERT INTO `cat_estatus` (`id_cat_estatus`, `clave`, `descripcion`, `valor`) VALUES
(1, 'COMPLETADO', 'Completado', 1),
(2, 'CANCELADO', 'Cancelado', 2),
(3, 'PENDIENTE', 'Pendiente', 3);