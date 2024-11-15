$(document).ready(function () {
    // Capturar el clic en el botón de registro
    $('#signupForm').submit(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto

        // Recoger los datos del formulario
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var email = $('#email').val();
        var telefono = $('#telefono').val();
        var password = $('#password').val();

        // Enviar los datos con AJAX
        $.ajax({
            url: 'querys/signin.php',  // Archivo PHP para procesar el registro
            type: 'POST',
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: telefono,
                password: password
            },
            dataType: 'json',
            success: function (response) {
                // Si la respuesta es exitosa
                if (response.success) {
                    // Guardar el nombre de usuario en localStorage
                    localStorage.setItem('userName', response.userName);
                    localStorage.setItem('email', response.email);
                    // Redirigir a la página de inicio de sesión o bienvenida
                    window.location.href = 'index.html';  // O la página que quieras
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
