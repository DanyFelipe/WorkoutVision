-- Estructura de las tablas

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `telefono` VARCHAR(15) NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Rutina` (
  `idRutina` INT NOT NULL AUTO_INCREMENT,
  `nombre_rutina` VARCHAR(45) NULL,
  `nivel` VARCHAR(20) NULL,
  `descripcion` TEXT NULL,
  PRIMARY KEY (`idRutina`))
ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Ejercicio` (
  `idEjercicio` INT NOT NULL AUTO_INCREMENT,
  `nombre_ejercicio` VARCHAR(45) NULL,
  `descripcion` TEXT NULL,
  PRIMARY KEY (`idEjercicio`))
ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `User_has_Rutina` (
  `User_idUser` INT NOT NULL,
  `Rutina_idRutina` INT NOT NULL,
  PRIMARY KEY (`User_idUser`, `Rutina_idRutina`),
  INDEX `fk_User_has_Rutina_Rutina1_idx` (`Rutina_idRutina` ASC),
  INDEX `fk_User_has_Rutina_User_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_User_has_Rutina_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Rutina_Rutina1`
    FOREIGN KEY (`Rutina_idRutina`)
    REFERENCES `Rutina` (`idRutina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Rutina_has_Ejercicio` (
  `Rutina_idRutina` INT NOT NULL,
  `Ejercicio_idEjercicio` INT NOT NULL,
  `series` INT NULL,
  `repeticiones` INT NULL,
  `peso` INT NULL,
  PRIMARY KEY (`Rutina_idRutina`, `Ejercicio_idEjercicio`),
  INDEX `fk_Rutina_has_Ejercicio_Ejercicio1_idx` (`Ejercicio_idEjercicio` ASC),
  INDEX `fk_Rutina_has_Ejercicio_Rutina1_idx` (`Rutina_idRutina` ASC),
  CONSTRAINT `fk_Rutina_has_Ejercicio_Rutina1`
    FOREIGN KEY (`Rutina_idRutina`)
    REFERENCES `Rutina` (`idRutina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rutina_has_Ejercicio_Ejercicio1`
    FOREIGN KEY (`Ejercicio_idEjercicio`)
    REFERENCES `Ejercicio` (`idEjercicio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Inserción de datos

INSERT INTO Ejercicio (idEjercicio, nombre_ejercicio, descripcion)
VALUES
(1, 'Press de Banca', 'Ejercicio para fortalecer el pecho, los hombros y los tríceps.'),
(2, 'Sentadilla', 'Ejercicio compuesto para trabajar las piernas y el core.'),
(3, 'Correr en Cinta', 'Ejercicio cardiovascular que mejora la resistencia aeróbica.'),
(4, 'Peso Muerto', 'Ejercicio compuesto que fortalece la espalda baja, glúteos y piernas.'),
(5, 'Burpees', 'Ejercicio de cuerpo completo que combina fuerza y resistencia.'),
(6, 'Remo con Barra', 'Fortalece la espalda y los bíceps mediante un movimiento de tracción.'),
(7, 'Plancha Abdominal', 'Fortalece el core y mejora la estabilidad.'),
(8, 'Dominadas', 'Ejercicio que desarrolla fuerza en la espalda y los bíceps.'),
(9, 'Estiramientos Dinámicos', 'Mejora la movilidad y prepara el cuerpo para el ejercicio.'),
(10, 'Zancadas', 'Ejercicio para fortalecer las piernas y mejorar el equilibrio.');

INSERT INTO Rutina (idRutina, nombre_rutina, nivel, descripcion)
VALUES
(1, 'Fuerza Básica', 'Principiante', 'Rutina diseñada para desarrollar fuerza en los principales grupos musculares.'),
(2, 'Resistencia Avanzada', 'Avanzado', 'Rutina enfocada en mejorar la resistencia muscular para atletas avanzados.'),
(3, 'Cardio Intermedio', 'Intermedio', 'Rutina para mejorar el rendimiento cardiovascular.'),
(4, 'Flexibilidad y Movilidad', 'Principiante', 'Rutina centrada en mejorar la flexibilidad y movilidad articular.'),
(5, 'Entrenamiento Funcional', 'Avanzado', 'Rutina que combina ejercicios de fuerza y resistencia funcional.');

INSERT INTO Rutina_has_Ejercicio (Rutina_idRutina, Ejercicio_idEjercicio, series, repeticiones, peso)
VALUES
(1, 1, 3, 10, 40),
(1, 2, 3, 12, 60),
(1, 4, 4, 8, 70),
(2, 5, 5, 15, NULL),
(2, 6, 4, 10, 50),
(2, 3, 3, 20, NULL),
(3, 3, NULL, NULL, NULL),
(3, 5, NULL, NULL, NULL),
(4, 9, NULL, NULL, NULL),
(4, 7, NULL, NULL, NULL);
