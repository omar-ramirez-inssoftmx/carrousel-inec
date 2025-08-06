CREATE TABLE `alumno` (
    `id_alumno` int NOT NULL AUTO_INCREMENT,
    `matricula` varchar(10) NOT NULL,
    `nombre` varchar(45) NOT NULL,
    `apellido_paterno` varchar(45) NOT NULL,
    `apellido_materno` varchar(45) DEFAULT NULL,
    `email` varchar(50) NOT NULL,
    `celular` varchar(10) NOT NULL,
    `open_pay_id` varchar(50) DEFAULT NULL,
    `fecha_alta` datetime NOT NULL,
    `fecha_modificacion` datetime NOT NULL,
    PRIMARY KEY (`id_alumno`)
) ENGINE = InnoDB AUTO_INCREMENT = 232 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `cat_estatus` (
    `id_cat_estatus` int NOT NULL AUTO_INCREMENT,
    `clave` varchar(45) NOT NULL,
    `descripcion` varchar(45) NOT NULL,
    `valor` int NOT NULL,
    PRIMARY KEY (`id_cat_estatus`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `pedidos` (
    `id_pedido` int NOT NULL AUTO_INCREMENT,
    `id_alumno` int NOT NULL,
    `identificador_pago` varchar(45) DEFAULT NULL,
    `id_cat_estatus` int NOT NULL,
    `tipo_pago` varchar(50) NOT NULL COMMENT 'Tipo de pago (efectivo, transferencia, tarjeta, etc.)',
    `ciclo` int NOT NULL COMMENT 'Ciclo escolar (entero)',
    `mes` int NOT NULL COMMENT 'Mes (entero 1-12)',
    `anio` int NOT NULL COMMENT 'Año (entero 4 posiciones)',
    `pago` decimal(10, 2) DEFAULT NULL COMMENT 'Monto base del pago',
    `fecha_vigencia_pago` date DEFAULT NULL,
    `link_de_pago` varchar(255) DEFAULT NULL,
    `transaccion_Id` varchar(100) DEFAULT NULL,
    `fecha_carga` date DEFAULT NULL,
    `fecha_pago` datetime DEFAULT NULL,
    `monto_real_pago` decimal(10, 2) DEFAULT '0.00' COMMENT 'Monto realmente pagado',
    PRIMARY KEY (`id_pedido`),
    KEY `id_cat_estatus_idx` (`id_cat_estatus`),
    KEY `id_alumno_idx` (`id_alumno`),
    CONSTRAINT `id_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`),
    CONSTRAINT `id_cat_estatus` FOREIGN KEY (`id_cat_estatus`) REFERENCES `cat_estatus` (`id_cat_estatus`)
) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `tarjetas` (
    `id` int NOT NULL AUTO_INCREMENT,
    `numero_tarjeta` varchar(16) NOT NULL,
    `token` varchar(255) NOT NULL,
    `id_alumno` int NOT NULL,
    `nombre_tarjeta` varchar(255) NOT NULL,
    `tipo` varchar(255) NOT NULL,
    `activa` tinyint(1) NOT NULL DEFAULT '0',
    `titular` varchar(255) NOT NULL,
    `vencimiento` varchar(255) NOT NULL,
    `eliminada` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `id_alumno` (`id_alumno`),
    CONSTRAINT `tarjetas_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;