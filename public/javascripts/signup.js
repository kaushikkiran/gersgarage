const signup = async () => {
        var fullName = $('#fullName').val();
        var userName = $('#userName').val();
        var phoneNumber = $('#phoneNumber').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
                alert("Incorrect Match. Please make sure to confirm the password again!");
                $('#password').val('');
                $('#confirmPassword').val('');
        }
        var url = '/api/v1/users/signup';
        try {
                $.post(url,
                        {
                                fullName: fullName,
                                userName: userName, 
                                password: password,
                                phoneNumber : phoneNumber
                        },
                        function (result) {
                                alert(result);
                                //window.location = "/home";
                        });
        }
        catch (err) {
                alert('error', err.response.data.message);
                //console.log('error', err.response.data.message);
        }
};