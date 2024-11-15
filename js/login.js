$(document).ready(function () {
    // Evento para el formulario de login
    $('#loginForm').submit(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Recoger los datos del formulario
        var email = $('#email').val();
        var password = $('#password').val();

        // Enviar los datos con AJAX
        $.ajax({
            url: 'querys/login.php',  // Archivo PHP para procesar el login
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function (response) {
                // Si la respuesta es exitosa
                if (response.success) {
                    // Guardar el nombre de usuario en localStorage
                    localStorage.setItem('userName', response.userName);
                    localStorage.setItem('email', response.email);

                    // Redirigir a la página principal (index.html)
                    window.location.href = 'index.html';
                } else {
                    // Mostrar mensaje de error
                    alert(response.message);
                }
            },
            error: function () {
                alert('Ocurrió un error al procesar tu solicitud.');
            }
        });
    });
});
