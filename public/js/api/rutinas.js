import { ajaxRequest } from "../utils/ajax.js";

export function fetchRutinasWithExercises(userId) {
    return ajaxRequest("routes/api.php", {
        action: "fetchRutinasWithExercises",
        userId: userId // Asegurarse de enviar el ID del usuario
    });
}

// Agregar una rutina a un usuario
export function addRutinaToUser(rutinaId) {
    return ajaxRequest("../routes/api.php", {
        action: "addRutinaToUser",
        rutinaId: rutinaId
    });
}
