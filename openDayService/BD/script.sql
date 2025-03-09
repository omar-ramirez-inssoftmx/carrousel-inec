CREATE TABLE `templates` (
  `id_templates` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(45) NOT NULL,
  `template` longtext NOT NULL,
  PRIMARY KEY (`id_templates`),
  UNIQUE KEY `clave_UNIQUE` (`clave`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cat_estatus` (
  `id_cat_estatus` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (`id_cat_estatus`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `sku` int NOT NULL,
  `producto` varchar(100) NOT NULL,
  `precio_base` varchar(45) NOT NULL,
  `concepto` varchar(45) NOT NULL,
  `vencimiento` date NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `sku_UNIQUE` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int NOT NULL,
  `identificador_pago` varchar(45) DEFAULT NULL,
  `identificador_pedido` varchar(45) DEFAULT NULL,
  `sku` int NOT NULL,
  `id_cat_estatus` int NOT NULL,
  `pago_descuento` decimal(10,0) NOT NULL,
  `fecha_vigenica_descuento` date DEFAULT NULL,
  `pago` decimal(10,0) DEFAULT NULL,
  `fecha_vigencia_pago` date DEFAULT NULL,
  `pago_recargo` decimal(10,0) DEFAULT NULL,
  `fecha_vigencia_recargo` date DEFAULT NULL,
  `link_de_pago` varchar(255) DEFAULT NULL,
  `concepto` varchar(255) DEFAULT NULL,
  `transaccion_Id` varchar(100) DEFAULT NULL,
  `fecha_carga` date DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_cat_estatus_idx` (`id_cat_estatus`),
  KEY `sku_idx` (`sku`),
  KEY `id_alumno_idx` (`id_alumno`),
  CONSTRAINT `id_alumno` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`),
  CONSTRAINT `id_cat_estatus` FOREIGN KEY (`id_cat_estatus`) REFERENCES `cat_estatus` (`id_cat_estatus`),
  CONSTRAINT `sku` FOREIGN KEY (`sku`) REFERENCES `productos` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cat_estatus` VALUES (1,'pago','Pagado',0),(2,'pago','Vencido',1),(3,'pago','Pendiente',2);

INSERT INTO `templates` VALUES (1,'email','<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  </head>\n  <body style=\"font-family: sans-serif; background-color: #F0F0F0; margin: 0; padding: 0;\">\n    <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" style=\"background-color: #F0F0F0;\">\n      <tr>\n        <td align=\"center\">\n          <table role=\"presentation\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"background-color: #ffffff; padding: 20px; border-radius: 8px;\">\n            \n            <!-- Encabezado -->\n            <tr>\n              <td style=\"border-bottom: 2px solid #F0F0F0; padding: 10px 20px; text-align: center;\">\n                <h1 style=\"font-size: 32px; margin: 0;\">#5435613</h1>\n                <h3 style=\"color:#989898; font-size: 20px; margin-top: 10px;\">Detalles de pago</h3>\n              </td>\n            </tr>\n\n            <!-- Fechas -->\n            <tr>\n              <td style=\"padding: 20px;\">\n                <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n                  <tr>\n                    <td style=\"width: 50%; text-align: left;\">\n                      <h4 style=\"color:#989898; font-weight: bold;\">Fecha de creación</h4>\n                      <h3 style=\"font-size: 20px;\">${creaFecha}</h3>\n                    </td>\n                    <td style=\"width: 50%; text-align: right;\">\n                      <h4 style=\"color:#989898; font-weight: bold;\">Fecha de caducidad</h4>\n                      <h3 style=\"font-size: 20px;\">${vigeniaFecha}</h3>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n            ${pedidos}\n            <tr>\n              <td style=\"padding: 20px;\">\n                <table role=\"presentation\" width=\"100%\">\n                  <tr>\n                    <td style=\"text-align: left;\">\n                      <h4 style=\"font-size: 20px; font-weight: bold; margin: 0;\">Total a pagar</h4>\n                    </td>\n                    <td style=\"text-align: right;\">\n                      <h4 style=\"font-size: 20px; font-weight: bold; margin: 0;\">${total}</h4>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n\n            <!-- Botón de pago -->\n            <tr>\n              <td align=\"center\" style=\"padding: 20px;\">\n                <a href=\"${link}\"  style=\"background: #AB8620; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-size: 20px; font-weight: bold;\">Realizar pago</a>\n              </td>\n            </tr>\n\n          </table>\n        </td>\n      </tr>\n    </table>\n  </body>\n</html>\n');
