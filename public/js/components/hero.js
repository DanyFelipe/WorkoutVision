import { fetchRutinasWithExercises } from "../api/rutinas.js";

export async function loadHeroSection() {
    const heroContainer = document.getElementById("hero-section");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userId = localStorage.getItem("userId");

    // Debug: Verifica el estado del usuario
    console.log("Usuario logueado:", isLoggedIn, "ID de usuario:", userId);

    // Limpia la sección hero
    heroContainer.innerHTML = "";

    if (!isLoggedIn || !userId) {
        // Mostrar hero para usuarios no logueados
        heroContainer.innerHTML = `
            <section class="hero" id="hero-default">
                <div class="hero-content">
                    <h1>Bienvenido a Workout Vision</h1>
                    <p>Empieza tu viaje fitness con nosotros.</p>
                    <a href="registro.html" class="btn-hero">Regístrate</a>
                </div>
            </section>
        `;
        return;
    }

    try {
        // Intentar obtener las rutinas del backend
        const response = await fetchRutinasWithExercises(userId);

        // Debug: Verificar la respuesta del servidor
        console.log("Respuesta del servidor:", response);

        if (!response.success) {
            throw new Error(response.message || "No se pudieron obtener las rutinas.");
        }

        const rutinas = Array.isArray(response.rutinas) ? response.rutinas : [];

        // Debug: Verificar las rutinas obtenidas
        console.log("Rutinas obtenidas:", rutinas);

        if (rutinas.length === 0) {
            // Mostrar hero invitando a crear rutinas
            heroContainer.innerHTML = `
                <section class="hero" id="hero-no-rutinas">
                    <div class="hero-content">
                        <h1>¿Sin rutinas aún?</h1>
                        <p>¡Es momento de construir las tuyas!</p>
                        <button id="btnShowRutinas" class="btn-hero">Ver Rutinas Disponibles</button>
                    </div>
                </section>
            `;
        } else {
            // Renderizar rutinas asignadas
            heroContainer.innerHTML = `
                <section class="hero" id="hero-rutinas">
                    <div class="hero-content">
                        <h1>Hola, ${localStorage.getItem("userName")}!</h1>
                        <p>Estas son tus rutinas:</p>
                        <div class="rutinas-container">
                            ${rutinas.map(rutina => `
                                <div class="rutina-card">
                                    <h3>${rutina.nombre_rutina} (${rutina.nivel})</h3>
                                    <p>${rutina.descripcion}</p>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </section>
            `;
        }
    } catch (error) {
        console.error("Error al cargar la sección hero:", error);
        heroContainer.innerHTML = `
            <section class="hero" id="hero-error">
                <div class="hero-content">
                    <h1>Error al cargar las rutinas</h1>
                    <p>Ocurrió un problema al intentar obtener tus rutinas. Por favor, intenta nuevamente más tarde.</p>
                </div>
            </section>
        `;
    }
}
