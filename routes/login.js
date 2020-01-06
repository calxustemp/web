var express = require('express');
var router = express.Router();
var common = require("./common.js");

/* GET Registration page. */
router.get('/login', function(req, res) {
    render_form(req, res)
});

function render_form(req, res) {
    common.verify_token(req).then(function(value) {
        var render_object = {};
        if (!value) {
            render_object.authenticated = false;
            res.render("pages/login", {render_object});
        } else {
            render_object.authenticated = true;
            res.render("pages/wall", {render_object});
        }
    });
}
module.exports = router;
