<?php

require_once __DIR__ . '/../models/Rutina.php';

class RutinaController
{
    private $rutinaModel;

    public function __construct()
    {
        $this->rutinaModel = new Rutina();
    }

    public function getRutinasWithExercises() {
        try {
            $rutinas = $this->rutinaModel->getRutinasWithExercises();
    
            // Verificar si las rutinas tienen datos
            if (empty($rutinas)) {
                echo json_encode(['success' => true, 'rutinas' => []]);
                exit;
            }
    
            echo json_encode(['success' => true, 'rutinas' => $rutinas]);
            exit;
        } catch (Exception $e) {
            error_log("Error al obtener rutinas: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Error al obtener rutinas']);
            exit;
        }
    }
    public function getUserRutinasWithExercises($userId) {
        require_once __DIR__ . '/../models/Rutina.php';
        $rutinaModel = new Rutina();
        $rutinas = $rutinaModel->getRutinasByUserId($userId);
    
        // Si el usuario no tiene rutinas, devuelve un array vacío
        return $rutinas ?: [];
    }
    
}
