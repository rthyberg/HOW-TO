var path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) { // the root home page
        res.render('home');
    });

    app.get('/steam-news', function(req, res) {
        res.render('news');
    });

    app.use(function(req, res) { // the no page page
        res.status(404);
        res.render('404');
    });

    app.use(function(err, req, res, next) { // server error page
        console.error(err.stack);
        res.type('plain/text');
        res.status(500);
        res.render('500');
    });
};
