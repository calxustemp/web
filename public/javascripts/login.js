$(document).ready(function() {

    // process the form
    $('#login_submit').click(function(event) {

        $('#email').css('border-color', '#ced4da');
        $('#invalid_credentials_text').attr('hidden', 'true');

        let user = {};
        user.email = $('input[id=email]').val();
        user.password = $.md5($('input[id=pwd]').val());

        let host = window.location.hostname;

        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://' + host + ':4567/login', // the url where we want to POST
            data        : JSON.stringify({user}), // our data object
            encode      : true,
            success     : function(data) {
                let json = JSON.parse(data);
                document.cookie = "" + json.cookie.key + "=" + json.cookie.value;
                window.location.replace("http://" + host + ":8081/wall");
            },
            error       : function(data) {
                $('#email').css('border-color', 'red');
                $('#invalid_credentials_text').removeAttr('hidden');
            }
        });
    });
});