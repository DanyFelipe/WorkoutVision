import { fetchUserRutinas, fetchAllRutinasWithExercises } from "../api/rutinas.js";

export async function loadHeroSection() {
    const heroContainer = document.getElementById("hero-section");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userId = localStorage.getItem("userId");

    heroContainer.innerHTML = ""; // Limpia el contenedor

    if (!isLoggedIn || !userId) {
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
        // Obtener rutinas del usuario
        const response = await fetchUserRutinas(userId);
        if (!response.success || response.rutinas.length === 0) {
            heroContainer.innerHTML = `
                <section class="hero" id="hero-no-rutinas">
                    <div class="hero-content">
                        <h1>¿Aún no tienes rutinas?</h1>
                        <p>¡Que esperas para construir las tuyas!</p>
                        <a href="#" class="btn-hero" id="btnVerRutinas">Ver Rutinas</a>
                    </div>
                </section>
            `;
            setupViewAllRutinasButton();
            return;
        }

        // Mostrar las rutinas del usuario
        heroContainer.innerHTML = `
            <section class="hero" id="hero-rutinas">
                <div class="hero-content">
                    <h1>Tus Rutinas:</h1>
                    <div class="rutinas-container">
                        ${response.rutinas
                            .map(
                                (rutina) => `
                                <div class="rutina-card">
                                    <h3>${rutina.nombre_rutina} (${rutina.nivel})</h3>
                                    <p>${rutina.descripcion}</p>
                                    <ul>
                                        ${rutina.ejercicios
                                            .map(
                                                (ej) => `
                                            <li>${ej.nombre_ejercicio} - ${ej.series || 0}x${ej.repeticiones || 0}</li>
                                        `
                                            )
                                            .join("")}
                                    </ul>
                                </div>
                            `
                            )
                            .join("")}
                    </div>
                </div>
            </section>
        `;
    } catch (error) {
        console.error("Error al cargar la sección hero:", error);
        heroContainer.innerHTML = `
            <section class="hero" id="hero-error">
                <div class="hero-content">
                    <h1>Error al cargar las rutinas</h1>
                    <p>Ocurrió un problema al intentar obtener las rutinas. Por favor, intenta nuevamente más tarde.</p>
                </div>
            </section>
        `;
    }
}
export function setupViewAllRutinasButton() {
    const viewAllRutinasButton = document.getElementById("btnVerRutinas");

    if (!viewAllRutinasButton) {
        console.error("No se encontró el botón para ver todas las rutinas.");
        return;
    }

    viewAllRutinasButton.addEventListener("click", async () => {
        try {
            const response = await fetchAllRutinasWithExercises();
            
            if (!response.success) {
                throw new Error(response.message || "Error al obtener las rutinas disponibles.");
            }

            renderAllRutinasHero(response.rutinas);
        } catch (error) {
            console.error("Error al cargar todas las rutinas:", error);
        }
    });
}
// Renderiza un nuevo hero con todas las rutinas disponibles
function renderAllRutinasHero(rutinas) {
    const heroContainer = document.getElementById("hero-section");
    heroContainer.innerHTML = `
        <section class="hero" id="hero-all-rutinas">
            <div class="hero-content">
                <h1>Rutinas Disponibles</h1>
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

