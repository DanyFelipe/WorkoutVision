<?php

require_once __DIR__ . '/../services/Database.php';

class Rutina
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function getRutinasWithExercises() {
        $query = "
            SELECT 
                r.idRutina, 
                r.nombre_rutina, 
                r.nivel, 
                r.descripcion AS rutina_descripcion,
                e.idEjercicio, 
                e.nombre_ejercicio, 
                e.descripcion AS ejercicio_descripcion,
                re.series,
                re.repeticiones,
                re.peso
            FROM Rutina r
            LEFT JOIN Rutina_has_Ejercicio re ON r.idRutina = re.Rutina_idRutina
            LEFT JOIN Ejercicio e ON re.Ejercicio_idEjercicio = e.idEjercicio
            ORDER BY r.idRutina
        ";
    
        $stmt = $this->db->prepare($query);
        $stmt->execute();
    
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        $result = [];
        foreach ($data as $row) {
            $rutinaId = $row['idRutina'];
    
            if (!isset($result[$rutinaId])) {
                $result[$rutinaId] = [
                    'idRutina' => $rutinaId,
                    'nombre_rutina' => $row['nombre_rutina'],
                    'nivel' => $row['nivel'],
                    'descripcion' => $row['rutina_descripcion'],
                    'ejercicios' => []
                ];
            }
    
            if ($row['idEjercicio']) {
                $result[$rutinaId]['ejercicios'][] = [
                    'idEjercicio' => $row['idEjercicio'],
                    'nombre_ejercicio' => $row['nombre_ejercicio'],
                    'descripcion' => $row['ejercicio_descripcion'],
                    'series' => $row['series'],
                    'repeticiones' => $row['repeticiones'],
                    'peso' => $row['peso']
                ];
            }
        }
    
        return array_values($result); // Devuelve los valores como un array indexado
    }    
}
