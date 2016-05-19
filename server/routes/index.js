var path = require('path');
var api_key = '702A6579FF7D3F81D418F7B53C1BD5F5';
module.exports = function(app, request, moment) {
    app.get('/', function(req, res) { // the root home page
        res.render('home');
    });

    app.get('/steam-news', function(req, res, next) {
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

    app.post('/steam-news', function(req, res, next) {
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
                        if(response.statusCode =403) {
                           context.items[0]={'contents': "The appid '"
                                              +appid+
                                            "' does not exist" };
                           res.render('news',context);
                        }
                    }
                   // next(err);
                }
            });
    });

    app.get('/steamid', function(req, res, next) {
        var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?";
        var context = {};
        context.items = [];
        var steamid = "76561197979155270";
        request(url + "key=" + api_key + "&steamids=" +steamid,
            function(err, response, idJson) {
                if (!err & response.statusCode < 400) {
                    context.steam = JSON.parse(idJson);
                    context.steam.username = context.steam.response.players[0]["personaname"];
                    context.steam.picture = context.steam.response.players[0]["avatarfull"];
                    context.steam.unixTime = context.steam.response.players[0]["timecreated"];
                    var day = moment.unix(context.steam.unixTime);
                    context.steam.date = day.format();
                   /* console.log(context.steam);
                    console.log(context.steam.username);
                    console.log(context.steam.picture);
                    console.log(context.steam.unixTime);
                    console.log(context.steam.date);
                    */
                    res.render('steamid', context);
                } else {
                    if (response) {
                        console.log(response.statusCode);
                        res.render('steamid',context.steam.username ="No such user");
                    }
                    //next(err);
                }
            });
    });

    app.post('/steamid', function(req, res, next) {
        var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?";
        var context = {};
        var steamid = req.body["steamid"] || steamid;
        request(url + "key=" + api_key + "&steamids=" +steamid,
            function(err, response, idJson) {
                if (!err & response.statusCode < 400) {
                    context.steam = JSON.parse(idJson);
                    context.steam.username = context.steam.response.players[0]["personaname"];
                    context.steam.picture = context.steam.response.players[0]["avatarfull"];
                    context.steam.unixTime = context.steam.response.players[0]["timecreated"];
                    var day = moment.unix(context.steam.unixTime);
                    context.steam.date = day.format();
                   /* console.log(context.steam);
                    console.log(context.steam.username);
                    console.log(context.steam.picture);
                    console.log(context.steam.unixTime);
                    console.log(context.steam.date);
                    */
                    res.render('steamid', context);
                } else {
                    if (response) {
                        console.log(response.statusCode);
                        res.render('steamid', context.steam.username ="No such user");
                    }
                    //next(err);
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
