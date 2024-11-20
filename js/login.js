$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        $.ajax({
            url: 'querys/login.php', 
            type: 'POST',
            data: {
                email: email,
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
