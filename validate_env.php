<?php

$file = __DIR__ . '/.env';

if (!file_exists($file)) {
    die("El archivo .env no existe en la ubicación esperada.\n");
}

$env = parse_ini_file($file);

if ($env === false) {
    die("Error al analizar el archivo .env. Verifica su formato.\n");
}

echo "Contenido del archivo .env:\n";
print_r($env);