<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gym_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
// Elimina esta línea si existe:
// echo "Conectado correctamente";
?>
