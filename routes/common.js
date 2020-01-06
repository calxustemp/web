var http = require('http');

var verify_token = function(req) {
    return new Promise(function(resolve, reject) {
        http.get('http://localhost:4567/login?token=' + req.cookies.token, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                console.log("status code: " + response.statusCode);
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

exports.verify_token = verify_token;