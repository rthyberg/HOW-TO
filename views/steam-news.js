console.log("fuck");
document.addEventListener('DOMContentLoaded', bindnewSubmit);
//var api_key = "702A6579FF7D3F81D418F7B53C1BD5F5";
function bindnewSubmit() {
    document.getElementById('newsSubmit').addEventListener('click', function(event) {
        var req = new XMLHttpRequest();
        var myId = {
            appId: null
        };
        myId.id = document.getElementById('newsappID').value;
        req.open("GET", "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?&appid=" + myId.appId + "&count=3&maxlength=300&format=json", true);
        //req.setRequestHeader('Content-Type', 'application/json')
        console.log("request Header?");
        req.send(null);
        req.addEventListener('loadstart', function(e) {
                console.log("making the request");
        });
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var jsonObj = req.responsetext;
                document.getElementById('JSON-DATA').textContent = jsonObj;
            } else {
                console.log("Error with news appi call");
            }
        });
        event.preventDefault();
    });
}
