<?php
include 'connection.php';  // Asegúrate de incluir tu archivo de conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos del formulario
    $email = $_POST['email'];  // Email del usuario
    $password = $_POST['password'];  // Contraseña del usuario

    // Consultar la base de datos para obtener el usuario
    $sql = "SELECT idUser, nombre, password, email FROM User WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);  // Vincula el parámetro

    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Usuario encontrado, verificar la contraseña
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['password'])) {
            // Si la contraseña es correcta, devolver datos de usuario (sin la contraseña)
            echo json_encode([
                'success' => true,
                'userName' => $user['nombre'],  // Enviar el nombre del usuario
                'email' => $user['email']
            ]);
        } else {
            // Contraseña incorrecta
            echo json_encode([
                'success' => false,
                'message' => 'Contraseña incorrecta'
            ]);
        }
    } else {
        // Usuario no encontrado
        echo json_encode([
            'success' => false,
            'message' => 'Usuario no encontrado'
        ]);
    }

    $stmt->close();
    $conn->close();
} else {
    // Si el método no es POST
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
