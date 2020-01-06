var express = require('express');
var router = express.Router();
var common = require('./common.js');
var http = require('http');

/* GET home page. */
router.get('/signout', function(req, res) {
    send_redirect(req, res)
});

function send_redirect(req, res) {
    let tokenVerified = common.verify_token(req);

    tokenVerified.then(function(value) {
        var render_object = {};
        let signedOut = signout(req);
        if (value) {
            signedOut.then(function(value) {
                render_object.authenticated = false;
                res.render("pages/login", {render_object});
            });
        } else {
            render_object.authenticated = false;
            res.render("pages/login", {render_object});
        }
    });

    tokenVerified.catch(function(error) {

    });
}

var signout = function(req) {
    return new Promise(function(resolve, reject) {
        http.get('http://localhost:4567/signout?token=' + req.cookies.token, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                if (response.statusCode === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        }).on("error", (err) => {
            resolve(false);
        });
    })
};

module.exports = router;
