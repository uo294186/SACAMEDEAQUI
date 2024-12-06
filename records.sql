--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `nivel` double NOT NULL,
  `tiempo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
