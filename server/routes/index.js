var path = require('path');
var api_key = '702A6579FF7D3F81D418F7B53C1BD5F5';
module.exports = function(app) {
    app.get('/', function(req, res) { // the root home page
        res.render('home');
    });

    app.post('/steam-news', function(req, res) {
        var url ="http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?"
        var context = {};
        var appid = req.body['newsappID'] || "440";
        request(url+"appid="+appid+"&count=3&maxlength=300&format=json"
                function(err,response,newsJson) {
                   if(!err & response.statusCode < 400){
                       context.news = newsJson;
                       res.render('news',context);
                   } else {
                     if(response) {
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
