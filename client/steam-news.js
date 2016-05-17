
document.addEventListener('DOMContentLoaded',bindnewSubmit);
var api_key = "AA30BA721147BF614B79795E3DDAF1A4"
function bindnewSubmit() {
        document.getElementById('newsSubmit').addEventListener('click', function(event){
                var req = new XMLHttpRequest();
                var myId = {id:null};
                myId.id = document.getElementById('newsappId').value;
                req.open("GET", "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid="+myId.id+"&count=3&maxlength=300&format=json", true);

                req.addEventListener('load', function() {
                        if(req.status >= 200 && req.status < 400) {
                          var jsonObj = req.responsetext;
                          document.getElementById('JSON-DATA').textContent = jsonObj;
                        } else { console.log("Error with news appi call");}
                        });
        });
                req.send(null);
                event.preventDefault();
}
