var path = require('path');
var api_key = '702A6579FF7D3F81D418F7B53C1BD5F5';
module.exports = function(app, request) {
    app.get('/', function(req, res) { // the root home page
        res.render('home');
    });

    app.get('/steam-news', function(req, res) {
        var url = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?"
        var context = {};
        context.items = [];
        var appid = "440";
        var count = "3";
        request(url + "appid=" + appid + "&count=" + count + "&maxlength=300&format=json",
            function(err, response, newsJson) {
                if (!err & response.statusCode < 400) {
                    context.news = JSON.parse(newsJson);
                    //context.newsitem=context.news.newsitem["title"];
                    for (item in context.news.appnews.newsitems) {
                        context.items[item] = context.news.appnews.newsitems[item];
                    }
                    res.render('news', context);
                } else {
                    if (response) {
                        console.log(response.statusCode);
                    }
                    next(err);
                }
            });
    });

    app.post('/steam-news', function(req, res) {
        console.log("post request made");
        var url = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?"
        var context = {};
        context.items = [];
        var appid = req.body["newsappID"] || appid;
        var count = "3";
        request(url + "appid=" + appid + "&count=" + count + "&maxlength=300&format=json",
            function(err, response, newsJson) {
                if (!err & response.statusCode < 400) {
                    context.news = JSON.parse(newsJson);
                    for (item in context.news.appnews.newsitems) {
                        context.items[item] = context.news.appnews.newsitems[item];
                    }
                    res.render('news', context);
                } else {
                    if (response) {
                        console.log(response.statusCode);
                    }
                    next(err);
                }
            });
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
