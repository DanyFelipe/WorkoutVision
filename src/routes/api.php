<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json'); // Forzar JSON en la respuesta

$action = $_POST['action'] ?? null;

if (!$action) {
    echo json_encode(['success' => false, 'message' => 'No se envió ninguna acción']);
    exit;
}

try {
    switch ($action) {
        case 'login':
            require_once __DIR__ . '/../controllers/AuthController.php';
            $authController = new AuthController();

            $email = $_POST['email'] ?? null;
            $password = $_POST['password'] ?? null;

            if (!$email || !$password) {
                echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
                exit;
            }

            $authController->login($email, $password);
            break;

        case 'register':
            require_once __DIR__ . '/../controllers/AuthController.php';
            $authController = new AuthController();

            $userData = [
                'nombre' => $_POST['nombre'] ?? null,
                'apellido' => $_POST['apellido'] ?? null,
                'email' => $_POST['email'] ?? null,
                'telefono' => $_POST['telefono'] ?? null,
                'password' => $_POST['password'] ?? null,
            ];

            $authController->register($userData);
            break;
        case 'fetchRutinasWithExercises':
            require_once __DIR__ . '/../controllers/RutinaController.php';
            $rutinaController = new RutinaController();
            $rutinas = $rutinaController->getRutinasWithExercises();
            
            error_log("Acción recibida: " . $action);
            error_log("Datos POST recibidos: " . json_encode($_POST));

            echo json_encode(['success' => true, 'rutinas' => $rutinas]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Acción no válida']);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
