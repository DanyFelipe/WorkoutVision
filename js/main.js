$(document).ready(function () {
    initNavbar();
    initHeroSection();
});

function initNavbar() {
    const userName = localStorage.getItem('userName');

    if (userName) {
        renderLoggedInNavbar(userName);
    } else {
        renderLoggedOutNavbar();
    }
}

function renderLoggedInNavbar(userName) {
    $('#auth-buttons').html(`
        <i class="fa-solid fa-right-from-bracket btn-logout" id="logoutButton"></i>
    `);
    $('#login-message').html(`
        <div id="login-message">¡Bienvenido, ${userName}!</div>
    `);
    $('#logoutButton').on('click', handleLogout);
}

function renderLoggedOutNavbar() {
    $('#auth-buttons').html(`
        <a class="btn-login" id="loginButton" href="./inicio_sesion.html">Iniciar sesión</a>
    `);
}

function handleLogout() {
    localStorage.removeItem('userName');
    updatePageState();
}

function updatePageState() {
    initNavbar();
}

function initHeroSection() {
    const userName = localStorage.getItem('userName');

    if (userName) {
        $('#hero-section').load('./components/hero-logged.html', function () {
            console.log("Sección de usuario logueado cargada.");
        });
    } else {
        $('#hero-section').load('./components/hero-default.html', function () {
            console.log("Sección predeterminada cargada.");
        });
    }
}

function handleLogout() {
    localStorage.removeItem('userName');
    updatePageState();
    window.location.href = 'index.html';
}

function updatePageState() {
    initNavbar();
    initHeroSection();
}

$(document).ready(function() {
    $('.navbar-toggle').click(function() {
        $('.dropdown-menu').toggleClass('active');
    });
});
