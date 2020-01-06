$(document).ready(function() {

    // process the form
    $('#register_submit').click(function(event) {

        $('#email_in_use_text').attr('hidden', 'true');
        $('#email').css('border-color', '#ced4da');

        if ($('input[id=pwd]').val() !== $('input[id=repeat_pwd]').val()) {
            $('#pwd').css('border-color', 'red');
            $('#repeat_pwd').css('border-color', 'red');
            $('#invalid_passwords_text').removeAttr('hidden');
            return;
        } else {
            $('#pwd').css('border-color', '#ced4da');
            $('#repeat_pwd').css('border-color', '#ced4da');
            $('#invalid_passwords_text').attr('hidden', 'true');
        }

        let user = {};
        user.first_name = $('input[id=first_name]').val();
        user.last_name = $('input[id=last_name]').val();
        user.email = $('input[id=email]').val();
        user.password = $.md5($('input[id=pwd]').val());

        let host = window.location.hostname;

        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://' + host + ':4567/user', // the url where we want to POST
            data        : JSON.stringify({user}), // our data object
            encode      : true,
            success     : function(data) {
                window.location.replace("http://" + host + ":8081/wall");
            },
            error       : function(data) {
                if (data.status === 418) {
                    $('#email').css('border-color', 'red');
                    $('#email_in_use_text').removeAttr('hidden');
                }
            }
        });
    });
});