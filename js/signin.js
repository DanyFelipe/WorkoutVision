$(document).ready(function () {
    $('#signupForm').submit(function (e) {
        e.preventDefault();

        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var email = $('#email').val();
        var telefono = $('#telefono').val();
        var password = $('#password').val();

        $.ajax({
            url: 'querys/signin.php',
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
                if (response.success) {
                    localStorage.setItem('userName', response.userName);
                    localStorage.setItem('email', response.email);
                    window.location.href = 'index.html';
                } else {
                    alert(response.message);
                }
            },
            error: function () {
                alert('Ocurrió un error al procesar tu solicitud.');
            }
        });
    });
});
