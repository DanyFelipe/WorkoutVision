<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO User (nombre, apellido, email, telefono, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nombre, $apellido, $email, $telefono, $password);

    if ($stmt->execute()) {
        // Responder con los datos del usuario para guardarlos en el localStorage
        echo json_encode([
            'success' => true,
            'message' => 'Usuario registrado correctamente',
            'userName' => $nombre,  // Puedes agregar más detalles si es necesario
            'email' => $email
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario: ' . $conn->error]);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
