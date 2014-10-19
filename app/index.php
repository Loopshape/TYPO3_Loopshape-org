<?php /*

    class Module {

    public function process() {

    $context = 'DATENSTROM';

    return $context;

    }

    }

    $App = new Module();
    ?>

    <!DOCTYPE HTML>

    <html>

    <head>
    <title>LOOPSHAPE &bull; Web Development Area</title>
    <meta charset="UTF-8" />
    </head>

    <body>

    <section id="apiModule">
    <?php echo $App -> process();
    ?>
    </section>

    <script>
    var google = require('googleapis');
    var OAuth2 = google.auth.OAuth2;

    var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar'];

    var url = oauth2Client.generateAuthUrl({
    access_type : 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope : scopes // If you only need one scope you can pass it as string
    });
    </script>

    </body>

    </html>
*/
?>

<html>
    <head>
        <script>
            function appendResults(text) {
                var results = document.getElementById('results');
                results.appendChild(document.createElement('P'));
                results.appendChild(document.createTextNode(text));
            }

            function makeRequest() {
                var request = gapi.client.urlshortener.url.get({
                    'shortUrl' : 'http://goo.gl/fbsS'
                });
                request.then(function(response) {
                    appendResults(response.result.longUrl);
                }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                });
            }

            function init() {
                gapi.client.setApiKey('YOUR API KEY');
                gapi.client.load('urlshortener', 'v1').then(makeRequest);
            }
        </script>
        <script src="https://apis.google.com/js/client.js?onload=init"></script>
    </head>
    <body>
        <div id="results"></div>
    </body>
</html>

