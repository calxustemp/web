var express = require('express');
var router = express.Router();
var common = require('./common.js');
var http = require('http');


/* GET home page. */
router.get('/', function(req, res) {
    render_wall(req, res)
});
router.get('/wall', function(req, res) {
    render_wall(req, res)
});

function render_wall(req, res) {
    let tokenVerified = common.verify_token(req);

    tokenVerified.then(function(value) {
        var render_object = {};
        if (value) {
            render_object.authenticated = true;
            let posts = get_posts(req);
            posts.then(function(value) {
                render_object.posts = JSON.parse(value).posts;
                console.log(render_object);
                res.render("pages/wall", {render_object});
            });            
        } else {
            render_object.authenticated = false;
            res.render("pages/login", {render_object});
        }
    });

    tokenVerified.catch(function(error) {

    });
}

var get_posts = function(req) {
    return new Promise(function(resolve, reject) {
        http.get('http://localhost:4568/post?token=' + req.cookies.token, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                if (response.statusCode === 200) {
                    resolve(data);
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
