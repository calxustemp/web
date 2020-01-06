$(document).ready(function() {

    // process the form
    $('#card_post').click(function(event) {

        let post = {};
        post.text = $('textarea[id=postTextArea]').val();
        post.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        let host = window.location.hostname;

        console.log(JSON.stringify({post}));

        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://' + host + ':4568/post', // the url where we want to POST
            data        : JSON.stringify({post}), // our data object
            encode      : true,
            success     : function(data) {
                window.location.replace("http://" + host + ":8081/wall");
            },
            error       : function(data) {
            }
        });
    });
});